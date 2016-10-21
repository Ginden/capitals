var details = $$$JSON_PLACEHOLDER$$$;
details.forEach(function(obj) {
    Object.freeze(obj);
    Object.freeze(obj.geometry);
    Object.freeze(obj.geometry.coordinates);
    Object.freeze(obj.properties);
});
module.exports = {
    rawData: details,
    findByCountryMatch: function(countryName) {
        return details.filter(function(country) {
            return country.details.country.match(countryName);
        })
    },
    findByContinent: function(_continent) {
        var continent = String(_continent).toLowerCase().replace(' ', '-');
        if (continent === 'australia') continent = 'oceania';
        return details.filter(function(country) {
            return country.properties.continent === continent;
        });
    }
};