import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <h3>Beer Near has one purpose, and one purpose only; to find the nearest brewery to you.</h3>
      <p>After a year of lounging inside and working from home, local businesses are opening up their taprooms and breweries, and they&apos;re looking for customer support. And you&apos;re an upstanding citizen who happens to need a beer absolutely right now.
      <br />
        <br />
        <strong>But wait!</strong> Searching &ldquo;Beer&ldquo; online gives too many results, and you just want breweries and taprooms.
      <br />
        <br />
        Well, panic no longer. Beer Near will show you the nearest <a href="https://www.brewersassociation.org/">Brewers Association</a> registered breweries to you, using your current location or any address you choose. Just click the beer-shaped button on the app&apos;s main page, and it will find you location&apos; nearest breweries. To look at other locations, just use the address search first.
      </p>
      <h3>Go get a beer!</h3>
      <br />
      <br />
      <br />
      <h4>Disclaimer</h4>
      <p><strong>Double check your result.</strong> This data comes from <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">Open Brewery DB</a>, an open source API that relies on the Brewers Association. If details have changed about the brewery, they might not be reflected in the results yet.</p>
      <p><strong>This app doesn&apos;t actively collect your data.</strong> However, it does use Google (and other) resources to function.</p>
      <h4>Resources</h4>
      <p>Data delivered by the <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">Open Brewery DB</a>, a free open source API.</p>
      <p>Map Markers customized with the <a href="https://mapmarker.io/" target="_blank" rel="noopener noreferrer">MapMarker.io</a> API</p>
      <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
};

export default About;