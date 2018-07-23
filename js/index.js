var App = {
  Module     : {},
  Controller : {},
};

App.Module.Search = function(search_input, results_container, no_results_container, profile_container) {

  this.search_input         = document.getElementById(search_input);
  this.results_container    = document.getElementById(results_container);
  this.no_results_container = document.getElementById(no_results_container);
  this.profile_container    = document.getElementById(profile_container);

  this.module_elements = [
    this.profile_container,
    this.no_results_container,
    this.results_container
  ];

  this.search_input.focus();

  this.search_input.onkeyup = function(){ this.on_key_up() }.bind(this);

  this.on_key_up = function() {
    var username = this.search_input.value;

    if( username === '' ){
      return this.toggle_elements();
    }

    this.get_users_data(username);
  };

  this.toggle_elements = function(element) {
    this.module_elements.forEach(function(element){
      element.classList.add("hidden");
    });

    if(element){
      element.classList.remove("hidden");
    }
  };

  this.no_results = function(results) {
    this.toggle_elements( this.no_results_container );
  };

  this.show_results = function(results) {

    if( !results.length ){
      this.no_results();
      return;
    }

    var list = document.createElement("ul");

    results.forEach(function(user_data){
      var item = document.createElement("li");

      item.onclick = function(){ this.show_profile( user_data ) }.bind(this);

      item.innerHTML = user_data['username'];

      list.appendChild( item );

    }.bind(this));

    this.results_container.innerHTML = "";
    this.results_container.appendChild(list);

    this.toggle_elements( this.results_container );
  };

  this.show_profile = function(user_data) {

    this.search_input.value = user_data['username'];

    var profile_data = [
      // 'id',
      'first_name',
      'last_name',
      'username',
      'email',
      'city',
      'country',
      'fav_color',
      'blog',
    ];

    this.profile_container.innerHTML = "";

    profile_data.forEach(function(data_key){
      if( !user_data[data_key] ){
        return;
      }
      var field_data = document.createElement("div");
      field_data.className = "field_data";

      field_data.innerHTML = '<b>'+data_key + '</b>: ' + user_data[data_key];
      this.profile_container.appendChild(field_data);
    }.bind(this));

    this.toggle_elements( this.profile_container );
  };

  this.get_users_data = function(username) {
    var endpoint = 'http://localhost:3000/users?username=' + username;
    var xhttp = new XMLHttpRequest();

    var self = this;

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        self.show_results( data );
      }
    };

    xhttp.open("GET", endpoint, true);
    xhttp.send();
  };

};
