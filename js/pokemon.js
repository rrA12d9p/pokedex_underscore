var pokemon = {

  pokemonList : allPokemon,

  printAllPokemonNamesToConsole : function(){
    _.each(this.pokemonList, function(pokeObj) {
      console.log( pokeObj.name );
    })
  },

  findPokemonByName : function(name){
    var pokemon = _.each(this.pokemonList, function(pokeObj) {
      if (pokeObj.name == name) { return pokeObj;}
    })
    console.log(pokemon)
  },

  findStrongestPokemon : function(){
    var strongest = _.max(this.pokemonList, function(pokeObj) {
      return parseInt(pokeObj.stats.attack);
    })
    console.log(strongest);
  },

  findPokemonByType : function(type){
    var allOfType = _.filter(this.pokemonList, function(pokeObj) {
      return pokeObj.type.indexOf(type) > -1; 
    })
    console.log(allOfType);
  },

  findAllTypes : function(){
    _.each(this.pokemonList, function(pokeObj) {
      console.log( pokeObj.type );
    })
  },

  totalStats : function(name){
    var pokemon = _.filter(this.pokemonList, function(pokeObj) {
      if (pokeObj.name == name) { return pokeObj; }
    })[0];

    var statsSum = _.reduce(pokemon.stats, function(memo, num){ return memo + parseInt(num); }, 0);

    console.log(statsSum);
    return statsSum;
  },

  sortTotalStats : function() {
    return sorted = _.sortBy(this.pokemonList, function(pokeObj) {
      return _.reduce(pokeObj.stats, function(memo, num){ return memo + parseInt(num); }, 0);
    }).reverse();
  }
}

var pokemonListSorted = pokemon.sortTotalStats();

_.each(pokemonListSorted, function(pokeObj){
  var statsTotal = _.reduce(pokeObj.stats, function(memo, num){ return memo + parseInt(num); }, 0);
  $('tbody').append('<tr>' + 
    "<td>" + "<img class='pokemon-avatar' src=" + pokeObj.img + ">" + "</td>" +
    "<td id='id'>" + pokeObj.id + "</td>" +
    "<td>" + pokeObj.name + "</td>" +
    "<td>" + pokeObj.type.join(", ") + "</td>" +
    "<td>" + pokeObj.stats.hp + "</td>" +
    "<td>" + pokeObj.stats.attack + "</td>" +
    "<td>" + pokeObj.stats.defense + "</td>" +
    "<td>" + pokeObj.stats.spattack + "</td>" +
    "<td>" + pokeObj.stats.spdefense + "</td>" +
    "<td>" + pokeObj.stats.speed + "</td>" +
    "<td>" + statsTotal + "</td>" + 
  "</tr>")
});

$("table").tablesorter({
  headers: {
    0: { sorter: false }
  }});

$(document).ready(function(){
  $(".pokemon-avatar")
    .on("mouseover", function(){
      var row = $(this).closest('tr');
      var selectedId = parseInt($('#id', row).html());
      var pokemon = allPokemon[selectedId - 1];
      $('div.preview').css('background-image', 'url(' + pokemon.card + ')');
      $('div.preview').show();
    })

    .on('mouseleave', function(){
      $('div.preview').hide();
    });
});