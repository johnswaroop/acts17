<?php
//Prints ISO date for podcast
function sb_print_iso_date($sermon) {
	if (is_object($sermon)) {
		echo date('D, d M Y H:i:s O', strtotime($sermon->datetime));
	} else
		echo date('D, d M Y H:i:s O', strtotime($sermon));
}

//Prints size of file
function sb_media_size($media_name, $media_type) {
	if ($media_type == 'URLs') {
		if(ini_get('allow_url_fopen')) {
			$headers = array_change_key_case(@get_headers($media_name, 1),CASE_LOWER);
			$filesize = $headers['content-length'];
			if ($filesize)
				return "length=\"{$filesize}\"";
		}
	} else
		return 'length="'.@filesize(SB_ABSPATH.sb_get_option('upload_dir').$media_name).'"';
}

//Returns duration of .mp3 file
function sb_mp3_duration($media_name, $media_type) {
	global $wpdb;
	if (strtolower(substr($media_name, -3)) == 'mp3' && $media_type == 'Files') {
		$duration = $wpdb->get_var("SELECT duration FROM {$wpdb->prefix}sb_stuff WHERE type = 'file' AND name = '".$wpdb->escape($media_name)."'");
		if ($duration)
			return $duration;
		else {
			require_once(SB_INCLUDES_DIR.'/getid3/getid3.php');
			$getID3 = new getID3;
			$MediaFileInfo = $getID3->analyze(SB_ABSPATH.sb_get_option('upload_dir').$media_name);
			$duration = isset($MediaFileInfo['playtime_string']) ? $MediaFileInfo['playtime_string'] : '';
			$wpdb->query("UPDATE {$wpdb->prefix}sb_stuff SET duration = '".$wpdb->escape($duration)."' WHERE type = 'file' AND name = '".$wpdb->escape($media_name)."'");
			return $duration;
		}
	}
}

//Replaces & with &amp;
function sb_xml_entity_encode ($string) {
	$string = str_replace('&amp;amp;', '&amp;', str_replace('&', '&amp;', $string));
	$string = str_replace('"', '&quot;', $string);
	$string = str_replace("'", '&apos;', $string);
	$string = str_replace('<', '&lt;', $string);
	$string = str_replace('>', '&gt;', $string);
	return $string;
}

// Convert filename to URL, perhaps with stats
// Stats have to be turned off for iTunes compatibility
function sb_podcast_file_url($media_name, $media_type) {
	$user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
	if (stripos($user_agent, 'itunes') !== FALSE | stripos($user_agent, 'FeedBurner') !== FALSE)
		$stats = FALSE;
	else
		$stats = FALSE;
	if ($media_type == 'URLs') {
		if ($stats)
			$media_name=sb_display_url().sb_query_char().'show&amp;url='.rawurlencode($media_name);
	} else {
		if (!$stats)
			$media_name=trailingslashit(site_url()).ltrim(sb_get_option('upload_dir'), '/').rawurlencode($media_name);
		else
			$media_name=sb_display_url().sb_query_char().'show&amp;file_name='.rawurlencode($media_name);
	}
	return sb_xml_entity_encode($media_name);
}

// Returns correct MIME type
function sb_mime_type($media_name) {
	require (SB_INCLUDES_DIR.'/filetypes.php');
	$extension = strtolower(substr($media_name, strrpos($media_name, '.') + 1));
	if (array_key_exists ($extension, $filetypes))
		return ' type="'.$filetypes[$extension]['content-type'].'"';
}

$sermons = sb_get_sermons(
	array(
		'title' => isset($_REQUEST['title']) ? stripslashes($_REQUEST['title']) : '',
		'preacher' => isset($_REQUEST['preacher']) ? $_REQUEST['preacher'] : '',
		'date' => isset($_REQUEST['date']) ? $_REQUEST['date'] : '',
		'enddate' => isset($_REQUEST['enddate']) ? $_REQUEST['enddate'] : '',
		'series' => isset($_REQUEST['series']) ? $_REQUEST['series'] : '',
		'service' => isset($_REQUEST['service']) ? $_REQUEST['service'] : '',
		'book' => isset($_REQUEST['book']) ? stripslashes($_REQUEST['book']) : '',
		'tag' => isset($_REQUEST['stag']) ? stripslashes($_REQUEST['stag']) : '',
	),
	array(
		'by' => 'm.datetime',
		'dir' => 'desc',
	),
	1,
	1000000
);

if (function_exists('wp_timezone_override_offset'))
	wp_timezone_override_offset();

header('Content-Type: application/rss+xml');
echo '<?xml version="1.0" encoding="UTF-8"?>'."\n";
?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
	<title><?php echo sb_xml_entity_encode(get_bloginfo('name')) ?> Podcast</title>
	<link><?php echo sb_xml_entity_encode(site_url()) ?></link>
	<description><?php echo sb_xml_entity_encode(get_bloginfo('description')) ?></description>
	<generator>Wordpress Sermon Browser plugin <?php echo SB_CURRENT_VERSION ?> (http://www.sermonbrowser.com/)</generator>
	<docs>http://blogs.law.harvard.edu/tech/rss</docs>
	<language>en-us</language>
	<copyright>Copyright 1977-2011</copyright>
	<pubDate><?php sb_print_iso_date(isset($sermons[0]) ? $sermons[0]: time()) ?></pubDate>
	<lastBuildDate><?php sb_print_iso_date(isset($sermons[0]) ? $sermons[0]: time()) ?></lastBuildDate>
	<category>Religion &amp; Spirituality</category>
	<itunes:author>Grace Baptist Church</itunes:author>
	<itunes:subtitle>Grace Baptist Church Media Podcast</itunes:subtitle>
	<itunes:explicit>no</itunes:explicit>
	<itunes:owner>
		<itunes:name>Grace Baptist Church</itunes:name>
		<itunes:email>test@gbcga.com</itunes:email>
	</itunes:owner>
	<itunes:category text="Religion &amp; Spirituality"></itunes:category>
<atom:link href="<?php echo sb_xml_entity_encode(sb_get_option('podcast_url')) ?>" rel="self" type="application/rss+xml" />
	<?php
		$mp3count = 0;
		$accepted_extensions = array ('mp3', 'm4a', 'mp4', 'm4v','mov', 'wma', 'wmv');
		foreach ($sermons as $sermon) {
			if ($mp3count > 15)
				break;
			$media = sb_get_stuff($sermon);
			if (is_array($media['Files']) | is_array($media['URLs'])) {
				foreach ($media as $media_type => $media_names)
					if (is_array($media_names) && $media_type != 'Code')
						foreach ((array)$media_names as $media_name)
							if (in_array(strtolower(substr($media_name, -3)), $accepted_extensions)) {
								$mp3count++;
?>
<item>
		<title><?php echo sb_xml_entity_encode(stripslashes($sermon->title)) ?></title>
		<link><?php echo sb_display_url().sb_query_char().'sermon_id='.$sermon->id ?></link>
		<audioLink><?php echo site_url().'/'.sb_get_option('upload_dir').'streaming/'.str_replace(".mp3",'/',$media_name).'prog_index.m3u8'; ?></audioLink>
	<? 
	$speakerimageURL = "http://gbcga.com/wp-content/uploads/sermons/images/".str_replace(" ", "-",strtolower(sb_xml_entity_encode(stripslashes($sermon->preacher))))."-mobile.png";
	$speakerimageFILE = $_SERVER{'DOCUMENT_ROOT'}."/wp-content/uploads/sermons/images/".str_replace(" ", "-",strtolower(sb_xml_entity_encode(stripslashes($sermon->preacher))))."-mobile.png";
	if (file_exists($speakerimageFILE)){
	echo "<thumbnail>".$speakerimageURL."</thumbnail>";}
	else {
	echo "<thumbnail>http://gbcga.com/wp-content/uploads/sermons/images/GBCaudio_100.jpg</thumbnail>";
	
	}
	?>
		<itunes:author><?php echo sb_xml_entity_encode(stripslashes($sermon->preacher)) ?></itunes:author>
		<speaker><?php echo sb_xml_entity_encode(stripslashes($sermon->preacher)) ?></speaker>
		<description><![CDATA[<?php echo stripslashes($sermon->description) ?>]]></description>

		<itunes:summary><![CDATA[<?php echo stripslashes($sermon->description) ?>]]></itunes:summary>

		<enclosure url="<?php echo sb_podcast_file_url($media_name, $media_type).'" '.sb_media_size($media_name, $media_type).sb_mime_type($media_name); ?> />
<?php   $duration = sb_mp3_duration($media_name, $media_type);
		if ($duration) { ?>
		<itunes:duration><?php echo $duration ?></itunes:duration>
<?php } ?>
		<pubDate><?php sb_print_iso_date($sermon) ?></pubDate>
		<guid><?php echo sb_podcast_file_url($media_name, $media_type) ?></guid>
		<category><?php echo sb_xml_entity_encode(stripslashes($sermon->series)) ?></category>		
		<media:group>
<?php if (is_array($media['Files'])){
foreach ($media['Files'] as $mediaitem){
?>
			<media:content url='<? echo sb_podcast_file_url($mediaitem,'Files') ?>' <? echo sb_mime_type($mediaitem)?> expression="full" />
<?
}
}
?>
<?php if (is_array($media['URLs'])){
foreach ($media['URLs'] as $mediaitem){
?>
			<media:content url='<? echo $mediaitem ?>' <? echo sb_mime_type($mediaitem) ?> expression="full" />
<?
}
}
?>
		</media:group>
		
		
	</item>
	<?php
				}
			}
		}
	?>
</channel>
</rss>
<?php die(); ?>