var details = $$$JSON_PLACEHOLDER$$$;

var _ = require('lodash');
details.forEach(function(obj) {
    Object.freeze(obj);
    Object.freeze(obj.geometry);
    Object.freeze(obj.geometry.coordinates);
    Object.freeze(obj.properties);
});

const euCountries = new Set([
    'Austria', 'Belgium', 'Bulgaria', 'Croatia',
    'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Ireland', 'Italy', 'Latvia',
    'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
    'Poland', 'Portugal', 'Romania', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'United Kingdom'
]);
module.exports = {
    rawData: details,
    findByCountryMatch: function(countryName) {
        return Object.freeze(details.filter(function(country) {
            return country.details.country.match(countryName);
        }));
    },
    findByContinent: _.memoize(function(_continent) {
        var continent = String(_continent).toLowerCase().replace(' ', '-');
        if (continent === 'australia') continent = 'oceania';
        return Object.freeze(details.filter(function(country) {
            return country.properties.continent === continent;
        }));
    }),
    eu28: _.once(function() {
        return Object.freeze(this.findByContinent('europe').filter(function(country) {
            return euCountries.has(country.properties.country);
        }));
    })
};