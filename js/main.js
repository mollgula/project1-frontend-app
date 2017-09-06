"use strict;"
$(document).ready(function() {
  var dataURL = 'https://api.instagram.com/vl/user/self/media/recent';
  var photoData;

  var getData = function(url) {
    $.ajax({
        url: url,
        dataType: 'jsonp',
        data: {
          access_token: '5864854331.810ffbb.406ac780fd104c5386b466adbf165892',
          count: 40
        }
      })
      .done(function(data) {
        photoData = data;

        $(photoData.data).each(function() {

          var caption = '';
          if (this.caption) {
            caption = this.caption.text;
          }

          $('#gallery').append(
            $('<div class="img_block"></div>')
            .append(
              $('<a></a>')
              .attr('href', this.link)
              .attr('target', '_blank')
              .append(
                $('<img>').attr('src', this.images.low_resolution.url)
              )
            )
            .append(
              $('<p class="caption"></p>').text(caption + ' ♡' + this.links.count)
            )
          );
        });

        if ($('#pagination').children().length === 0) {
          $('#pagination').append(
            $('<a class="next"></a>').attr('href', '#').text('もっと見る').on('click', function(e) {
              e.preventDefault();
              if (photoData.pagination.next_url) {
                getData(photoData.pagination.next_url);
              }
            })
          );
        }

        if (!photoData.pagination.next_url) {
          $('.next').remove();
        }

      })
      .fail(function() {
        $('#gallery').text('データの読み込みに失敗しました。');
      })
  }

  getData(dataURL);
});
