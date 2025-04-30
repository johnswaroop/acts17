<?php
function sb_do_shortcode ($content) {
	$shortcodes = array ('filters_form' => 'sb_filters_form', 'most_popular' => 'sb_print_most_popular', 'tag_cloud' => 'sb_shortcode_tag_clouds', 'sermons_count' => 'sb_sermons_count',
					'sermons_loop' => 'sb_sermons_loop', 'sermon_title' => 'sb_sermon_title', 'preacher_link' => 'sb_preacher_link', 'series_link' => 'sb_series_link',
					'service_link' => 'sb_service_link', 'date' => 'sb_sermon_date', 'passages' => 'sb_passages', 'files_loop' => 'sb_files_loop', 'embed_loop' => 'sb_embed_loop',
					'next_page' => 'sb_next_page', 'previous_page' => 'sb_previous_page', 'podcast_for_search' => 'sb_podcast_for_search', 'podcast' => 'sb_podcast',
					'itunes_podcast' => 'sb_itunes_podcast', 'itunes_podcast_for_search' => 'sb_itunes_podcast_for_search', 'podcasticon' => 'sb_podcasticon',
					'podcasticon_for_search' => 'sb_podcasticon_for_search', 'editlink' => 'sb_editlink', 'creditlink' => 'sb_creditlink', 'sermon_description' => 'sb_sermon_description',
					'preacher_description' => 'sb_preacher_description', 'preacher_image' => 'sb_preacher_image', 'passages_loop' => 'sb_passages_loop', 'passage' => 'sb_passage',
					'next_sermon' => 'sb_next_sermon', 'prev_sermon' => 'sb_prev_sermon', 'sameday_sermon' => 'sb_sameday_sermon', 'tags' => 'sb_tags', 'bibletext' => 'sb_bibletext', 'sermon_image' => 'gbcga_sermon_image');
	foreach ($shortcodes as $shortcode => $function)
		add_shortcode ($shortcode, $function);
	$content = do_shortcode ($content);
	foreach ($shortcodes as $shortcode => $function)
		remove_shortcode ($shortcode);
	return $content;
}

function sb_filters_form ($atts, $content = null) {
	global $sermon_shortcode_atts;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$atts = shortcode_atts($sermon_shortcode_atts, $atts);
	$output = sb_print_filters($atts);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_sermons_count ($atts, $content = null) {
	global $record_count;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if ($record_count)
		return $atts['before'].$record_count.$atts['after'];
}

function sb_print_tag_clouds () {
	_deprecated_function(__FUNCTION__, '0.46', 'sb_tag_clouds');
}

function sb_shortcode_tag_clouds($atts, $content = null) {
	$atts = shortcode_atts(array('minfont' => 80, 'maxfont' => 150, 'before' => '', 'after' => ''), $atts);
	$output = sb_tag_clouds(rtrim($atts['minfont'], '%'), rtrim($atts['maxfont'], '%'));
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_sermons_loop ($atts, $content = null) {
	global $sermons, $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = '';
	foreach ($sermons as $sermon)
		$output .= do_shortcode($content);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_sermon_title ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if ($sermon->title)
		return $atts['before'].'<a href="'.sb_print_sermon_link($sermon, false).'">'.stripslashes($sermon->title).'</a>'.$atts['after'];
}

function sb_preacher_link ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if ($sermon->preacher)
		return $atts['before'].'<a href="'.sb_print_preacher_link($sermon, false).'">'.stripslashes($sermon->preacher).'</a>'.$atts['after'];
}

function sb_series_link ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'exclude' => ''), $atts);
	$exclude = explode(',', $atts['exclude']);
	if (!in_array($sermon->ssid, $exclude) && !in_array($sermon->series, $exclude))
		return $atts['before'].'<a href="'.sb_print_series_link($sermon, false).'">'.stripslashes($sermon->series).'</a>'.$atts['after'];
}

function sb_service_link ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'exclude' => ''), $atts);
	$exclude = explode(',', $atts['exclude']);
	if (!in_array($sermon->sid, $exclude) && !in_array($sermon->service, $exclude))
		return $atts['before'].'<a href="'.sb_print_service_link($sermon, false).'">'.stripslashes($sermon->service).'</a>'.$atts['after'];
}

function sb_sermon_date ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_formatted_date ($sermon);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_passages ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'between' => ', '), $atts);
	$output = array();
	for ($passage_index = 0; $passage_index < count($sermon->start); $passage_index++)
		$output[] = sb_get_books($sermon->start[$passage_index], $sermon->end[$passage_index]);
	if ($output) {
		$output = implode ($atts['between'], $output);
		return $atts['before'].$output.$atts['after'];
	}
}

function sb_files_loop ($atts, $content = null) {
	global $sermon, $media_name;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = '';
	$media = sb_get_stuff($sermon);
	add_shortcode('file', 'sb_file');
	foreach ((array) $media as $media_type => $media_names)
		if (is_array($media_names) && $media_type != "Code")
			foreach ((array)$media_names as $media_name)
				$output .= do_shortcode($content);
	remove_shortcode ('file');
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_file ($atts, $content = null) {
	global $media_name;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'mp3download' => 'false', 'show' => 'icon'), $atts);
	$output = sb_print_url ($media_name, false, $atts);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_embed_loop ($atts, $content = null) {
	global $sermon, $media_name;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = '';
	$media = sb_get_stuff($sermon);
	add_shortcode ('embed', 'sb_embed');
	foreach ((array) $media as $media_type => $media_names)
		if (is_array($media_names) && $media_type == 'Code')
			foreach ((array)$media_names as $media_name)
				$output .= do_shortcode($content);
	remove_shortcode('embed');
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_embed ($atts, $content = null) {
	global $media_name;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_print_code ($media_name, false);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_next_page ($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_next_page_link();
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_previous_page ($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_prev_page_link();
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_podcast_for_search($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_podcast_url();
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_podcast ($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_get_option('podcast_url');
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_itunes_podcast ($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if (sb_get_option('podcast_url'))
		return $atts['before'].str_replace('http://', 'itpc://', sb_get_option('podcast_url')).$atts['after'];
}

function sb_itunes_podcast_for_search ($atts, $content = null) {
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if (sb_podcast_url())
		return $atts['before'].str_replace('http://', 'itpc://', sb_podcast_url()).$atts['after'];
}

function sb_podcasticon ($atts, $content = null) {
	global $sermon_domain;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'src' => SB_PLUGIN_URL.'/sb-includes/icons/podcast.png'), $atts);
		return $atts['before'].'<img alt="'.__('Subscribe to full podcast', $sermon_domain).'" title="'.__('Subscribe to full podcast', $sermon_domain).'" class="podcasticon" src="'.$atts['src'].'"/>'.$atts['after'];
}

function sb_podcasticon_for_search ($atts, $content = null) {
	global $sermon_domain;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'src' => SB_PLUGIN_URL.'/sb-includes/icons/podcast_custom.png'), $atts);
	return $atts['before'].'<img alt="'.__('Subscribe to custom podcast', $sermon_domain).'" title="'.__('Subscribe to custom podcast', $sermon_domain).'" class="podcasticon" src="'.$atts['src'].'"/>'.$atts['after'];

}

function sb_editlink ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if (current_user_can('publish_posts')) {
		$id = (int)$sermon->id;
		return $atts['before'].'<div class="sb_edit_link"><a href="'.site_url().'/wp-admin/admin.php?page=sermon-browser/new_sermon.php&mid='.$id.'">Edit Sermon</a></div>'.$atts['after'];
	}
}

function sb_creditlink ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
		return $atts['before'].'<div id="poweredbysermonbrowser">Powered by <a href="http://www.sermonbrowser.com/">Sermon Browser</a></div>'.$atts['after'];
}

function sb_sermon_description($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	if ($sermon->description)
		return $atts['before'].wpautop(stripslashes($sermon->description)).$atts['after'];	
}

function sb_preacher_description($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_print_preacher_description($sermon, false);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_preacher_image($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'width' => 150, 'height' => 150), $atts);
	$output = sb_print_preacher_image($sermon, false, $atts);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_passages_loop ($atts, $content = null) {
	global $sermon, $passage_index;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = '';
	$ref_output = array();
	for ($passage_index = 0; $passage_index < count($sermon->start); $passage_index++)
		$output .= do_shortcode ($content);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_passage ($atts, $content = null) {
	global $sermon, $passage_index;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'between' => ', '), $atts);
	return
		$atts['before'].sb_get_books($sermon->start[$passage_index], $sermon->end[$passage_index]).$atts['after'].(isset($sermon->start[$passage_index+1]) ? $atts['between'] : '');
}

function sb_next_sermon ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_print_next_sermon_link($sermon, false);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_prev_sermon ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => ''), $atts);
	$output = sb_print_prev_sermon_link($sermon, false);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_sameday_sermon ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'between' => ', '), $atts);
	$output = sb_print_sameday_sermon_link($sermon, false, $atts['between']);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_tags ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'between' => ', '), $atts);
	$output = sb_print_tags ($sermon, false, $atts['between']);
	if ($output)
		return $atts['before'].$output.$atts['after'];
}

function sb_bibletext ($atts, $content = null) {
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'version' => 'esv', 'apikey' => 'IP'), $atts);
	if (count($sermon->start) > 0) {
		$output = '<div class="bibletext">';
		for ($i = 0; $i < count($sermon->start); $i++) 
			if (strtolower($atts['version']) != 'none')
				$output .= sb_add_bible_text ($sermon->start[$i], $sermon->end[$i], $atts);
			else
				$output .= sb_print_bible_passage ($sermon->start[$i], $sermon->end[$i], false);
		return $output.'</div>';
	}
}

function gbcga_sermon_image ($atts, $content = null){
	global $sermon;
	$atts = shortcode_atts(array('before' => '', 'after' => '', 'width' => 150, 'height' => 150), $atts);
	$output = gbcga_print_sermon_image($sermon, false, $atts);
	if ($output)
		return $atts['before'].'<a href="'.sb_print_sermon_link($sermon,false).'">'.$output.'</a>'.$atts['after'];

return $atts['before'].'<a href="'.sb_print_sermon_link($sermon, false).'">'.stripslashes($sermon->title).'</a>'.$atts['after'];

}
?>