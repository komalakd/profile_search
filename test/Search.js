describe("Search Module", function() {

  describe("Search Module Constructor", function() {

    it('module should get element by id',function(){
      spyOn(document, "getElementById").and.callThrough();
      var search_module = new App.Module.Search();
      expect(document.getElementById).toHaveBeenCalled();
    });

    xit('module should focus search input', function(){
      var search_module = new App.Module.Search();
      var focusedElement = document.activeElement;
      expect(search_module.search_input).toEqual(focusedElement);
    });

  });

  describe("Search Module on_key_up", function() {

    beforeEach(function(){
      document.getElementById = function(){ return document.createElement('div'); }
      this.search_module = new App.Module.Search();
    });

    it('module should not search',function(){

      spyOn(this.search_module, 'toggle_elements');
      spyOn(this.search_module, 'get_users_data');

      this.search_module.search_input.value = "";
      this.search_module.on_key_up();

      expect(this.search_module.toggle_elements).toHaveBeenCalled();
      expect(this.search_module.get_users_data).not.toHaveBeenCalled();
    });

    it('module should search',function(){

      spyOn(this.search_module, 'toggle_elements');
      spyOn(this.search_module, 'get_users_data');

      this.search_module.search_input.value = "asd";
      this.search_module.on_key_up();

      expect(this.search_module.toggle_elements).not.toHaveBeenCalled();
      expect(this.search_module.get_users_data).toHaveBeenCalled();
    });

  });

  describe("Search Module toggle_elements", function() {
    beforeEach(function(){
      document.getElementById = function(){ return document.createElement('div'); }
      this.search_module = new App.Module.Search();
    });

    it('module should hide elements',function(){
      this.search_module.toggle_elements();
      expect(this.search_module.profile_container.className.indexOf("hidden") ).toBeLessThan(1);
      expect(this.search_module.no_results_container.className.indexOf("hidden") ).toBeLessThan(1);
      expect(this.search_module.results_container.className.indexOf("hidden") ).toBeLessThan(1);
    });

    it('module should show element',function(){
      this.search_module.toggle_elements( this.search_module.profile_container );
      expect(this.search_module.profile_container.className.indexOf("hidden")).toBe(-1);
      this.search_module.toggle_elements( this.search_module.no_results_container );
      expect(this.search_module.no_results_container.className.indexOf("hidden")).toBe(-1);
      this.search_module.toggle_elements( this.search_module.results_container );
      expect(this.search_module.results_container.className.indexOf("hidden")).toBe(-1);
    });

  });

  describe("Search Module no_results", function() {

  });

  describe("Search Module show_results", function() {

    beforeEach(function(){
      document.getElementById = function(){ return document.createElement('div'); }
      this.search_module = new App.Module.Search();
    });

    it('module should show no_results_container',function(){
      this.search_module.show_results([]);
      expect(this.search_module.no_results_container.className.indexOf("hidden")).toBe(-1);
    });

    it('module should show results_container',function(){
      this.search_module.show_results([]);
      expect(this.search_module.results_container.className.indexOf("hidden")).toBe(0);
    });

  });

  describe("Search Module show_profile", function() {

    beforeEach(function(){
      document.getElementById = function(){ return document.createElement('div'); }
      this.search_module = new App.Module.Search();
    });

    it('module should show profile_container',function(){
      this.search_module.show_profile([]);
      expect(this.search_module.profile_container.className.indexOf("hidden")).toBe(-1);
    });

  });

  describe("Search Module get_users_data", function() {

  });

});
