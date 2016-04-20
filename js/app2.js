// global variables
var map;
var infowindow;
var results=[];
var FsResults=[];
var foodList=['Modern European', 'Desserts', 'German', 'French', 'Cafes', 'Do-It-Yourself Food', 'Coffee & Tea', 'Fondue', 'Caribbean', 'Ice Cream', 'Deli / Bodega', 'Hotel Bar', 'Coffee Shop', 'Restaurant', 'Café', 'Brewery', 'Bagels', 'Sandwiches', 'Fish & Chips', 'Food Stands', 'Dive Bars', 'Food'];
var activeList=['Active Life', 'Gyms', 'Skate Park', 'Climbing Gym', 'Gym / Fitness', 'Dance Studio'];
var museumList=['Art Museum', 'Science Museum', 'Art Gallery'];

// function to create venue objects
var venue=function(data){
	this.dataSrc=ko.observable(data.src);
	this.name=ko.observable(data.name);
	this.phone=ko.observable(data.phone);
	this.address=ko.observable(data.location.display_address[0]);
	this.img=ko.observable(data.image_url);
	this.category=ko.observable(data.category);
	this.webUrl=ko.observable(data.webUrl);

	this.yelpRating=ko.observable(data.yRating);
	this.yelpReviewCount=ko.observable(data.yReview_count);
	this.yelpRatingImg=ko.observable(data.yRatingImg);
	this.yelpSnippet=ko.observable(data.ySnippet_text);
	this.yelpUrl=ko.observable(data.yUrl);

	this.fsRating=ko.observable(data.fsRating);
	this.fsLink=ko.observable(data.fsLink);
	this.fsTips=ko.observable(data.fsTips);
	this.fsTipSnippet=ko.observable(data.fsTipSnippet);
	this.fsTipLink=ko.observable(data.fsTipLink);
	this.isVisible=ko.observable(data.isVisible);
};

// initialise map
initMap=function(){
   	var homeLl=new google.maps.LatLng(model.home[0],model.home[1]);
	var mapOptions={
   		zoom: 16,
   		center: homeLl,
   		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById('mapDiv'),mapOptions);
	// set visibility for google's default POI's to 'off'
	map.set('styles', [
		{
			featureType: 'poi',
			elementType: 'all',
			stylers: [
				{ visibility: 'off' }
  			]
  		}
	]);
};

function Model(){
	var self=this;
	//Set the home location coordinates to initialize the map here
	self.home=[51.447581,5.457728];
	//Create an observable array to store a list of map markers
	self.markers=ko.observableArray([]);
	//Create an observable array to store a list of venue objects
	self.venueList=ko.observableArray([]);
	self.currentVenueName=ko.observable('');
}
var model =new Model();

function ViewModel(){
	var self = this;
	// variable to store the selected venue
	self.currentVenue=ko.observable(model.venueList()[0]);
	self.searchTerm=ko.observable('');
	self.errorMessage=ko.observable('');

	// maps api errorhandling
	errorHandling=function(){
		self.errorMessage("Can't load the map and app");
	};
}
ko.applyBindings(new ViewModel());