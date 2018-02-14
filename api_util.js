export const getCity = (city) => {
  return $.ajax({
    url: `https://api.teleport.org/api/urban_areas/slug%3A${city}/scores/`
  });
};
