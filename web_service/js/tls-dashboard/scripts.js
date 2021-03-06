$(function () {
  $('#created_date').html(run_date);
  
  var sorted_certificates = Object.keys(cert_info)
    .sort(function( a, b ) {
      return cert_info[a].info.sort_order - cert_info[b].info.sort_order;
    }).map(function(sortedKey) {
      return cert_info[sortedKey];
  });
  
  var card_html = String()
    +'<div class="col-xs-12 col-md-6 col-lg-4 col-xl-3">'
    +'  <div class="card text-xs-center" style="border-color:#333;">'
    +'    <div class="card-header" style="">'
    +'      <h4 class="text-muted" style="margin-bottom:0;padding-bottom:.25rem;;overflow:hidden;text-overflow:ellipsis;">{{server}}</h4>'
    +'    </div>'
    +'    <div class="card-block {{background}}">'
    +'      <h1 class="card-text display-4" style="margin-top:0;margin-bottom:-1rem;">{{days_left}}</h1>'
    +'      <p class="card-text" style="margin-bottom:.75rem;"><small>days left</small></p>'
    +'    </div>'
    +'    <div class="card-footer">'
    +'      <h6 class="text-muted" style="margin-bottom:.5rem;">Issued by: {{issuer}}</h6>'
    +'      <h6 class="text-muted" style="overflow:hidden;text-overflow:ellipsis;"><small>{{issuer_cn}}</small></h6>'
    +'      <h6 class="text-muted" style="margin-bottom:0;"><small>{{common_name}}</small></h6>'
    +'    </div>'
    +'  </div>'
    +'</div>';
  
  function insert_card(json) {
    var card_template = Handlebars.compile(card_html),
      html = card_template(json);
    $('#panel').append(html);
  };

  sorted_certificates.forEach(function(element, index, array){
    var json = {
      'server': element.server,
      'days_left': element.info.days_left,
      'issuer': element.issuer.org,
      'common_name': element.subject.common_name,
      'issuer_cn': element.issuer.common_name
    };
    switch (element.info.background_class) {
      case "danger":
        json.background = 'card-inverse card-danger';
        break;
      case "warning":
        json.background = 'card-inverse card-warning';
        break;
      case "info":
        json.background = 'card-inverse card-info';
        break;
      case "success":
        json.background = 'card-inverse card-success';
        break;
      default:
        json.background = 'card-inverse card-info';
        break;
    };
    insert_card(json);

  });
});