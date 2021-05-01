// Original Script https://greasyfork.org/en/scripts/13424-join-all-groups-on-a-profile

// ==UserScript==
// @name         Join all groups on a profile
// @namespace    http://teamgamerfood.com
// @version      0.1.3
// @description  Join all of someone's steam groups
// @author       A5 
// @match        *://steamcommunity.com/id/*
// @match        *://steamcommunity.com/profiles/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==
//
/**********************************************************************************************************/
/* * * * * * * * * * * * * * * * * * * * * Leave the rest below alone * * * * * * * * * * * * * * * * * * */
/**********************************************************************************************************/

function JoinProfilesGroups()
{
	return $.ajax({
		url: 'https://steamcommunity.com/profiles/' + g_rgProfileData.steamid + '/?xml=1',
		data: { xml:1 },
		type: 'GET',
		dataType: 'xml'
	}).done(function(xml) {
		$(xml).find('groupID64').each(function(){
			
			var params = {
				action: 'join',
				sessionID: g_sessionID,
			};

			$.ajax({
				url: 'https://steamcommunity.com/gid/' + $(this).text(),
				data: params,
				type: 'POST',
				dataType: 'json'
			}).done(function(data) {
					console.log('[Auto-Group-Joiner] Joined Group.');
			}).fail(function() {
				console.log('[Auto-Group-Joiner] Error processing your request. Please try again.');
			});
		});
	}).fail(function() {
		console.log('[Auto-Group-Joiner] The request failed or the group custom URL is wrong.');
	});
}

// Start invite process
JoinProfilesGroups();
