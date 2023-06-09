$(document).ready(function () {
    function encode(r) { return r.replace(/[\x26\x0A\<>'"]/g, function (r) { return "&#" + r.charCodeAt(0) + ";" }) }

    $.getJSON("/api", function (data) {
        $(".players-public").text(data.public_player_count);
        $(".players-private").text(data.private_player_count);
        $(".players-total").text(data.total_player_count);

        $(".games-public").text(data.public_game_count);
        $(".games-private").text(data.private_game_count);
        $(".games-total").text(data.total_game_count);

        $(".in-progress-total").text(data.in_progress_count);
        $(".proxy-server-total").text(data.master_proxy_count);
    });

    $.getJSON("/api/public_games", function (data) {
        $.each(data, function () {
            $(".public-games").append('<div class="card margin-bt shadow"><div class="card-header"><div class="row"><div class="col-sm-10"><i class="red-sw fas fa-gamepad"></i> ' + this.game_name + ' <span class="badge badge-dark">' + this.title_id + '</span> <span class="badge badge-dark">v' + this.title_version + '</span></div>'
                + '<div class="col-sm-2 games-players-number"><i class="blue-sw fas fa-users"></i> ' + this.player_count + '/' + this.max_player_count + ' Players</div></div></div>'
                + '<div class="card-body"><blockquote class="blockquote mb-0"><i class="blue-sw fas fa-home"></i> ' + this.players.map(player => encode(player)).join(', <i class="fas fa-user"></i> ')
                + '<footer class="blockquote-footer">' + ((this.mode == "P2P") ? '<i class="blue-sw fas fa-people-arrows"></i> ' : '<i class="blue-sw fas fa-server"></i> ') + this.mode + ' (' + this.status + ')</footer></blockquote></div></div>');
        });
    });
});
