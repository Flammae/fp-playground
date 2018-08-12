const impure = {
  getJson: R.curry((cb, url) => $.getJSON(url, cb)),
  setHtml: R.curry((sel, html) => $(sel).html(html)),
  trace: R.curry((tag, x) => {
    console.log(tag, x);
    return x;
  })
};

// pure
const host = "api.flickr.com";
const path = "/services/feeds/photos_public.gne";
const query = t => `?tags=${t}&format=json&jsoncallback=?`;
const url = t => `https://${host}${path}${query(t)}`;

const image = src => $("<img />", { src });
const mediaUrl = R.compose(
  R.prop("m"),
  R.prop("media")
);
// const mediaUrls = R.compose(
//   R.map(mediaUrl),
//   R.prop("items")
// );
const mediaToImage = R.compose(
  image,
  mediaUrl
);

const images = R.compose(
  R.map(mediaToImage),
  R.prop("items")
);

// impure
const render = R.compose(
  impure.setHtml("#main"),
  images
);
const app = R.compose(
  impure.getJson(render),
  url
);
app("harry potter");
