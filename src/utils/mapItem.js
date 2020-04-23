export default ({
  id, creator, createdAt, image,
}, callBack) => `
<div class="map-item">
  <img class="map-item-image" src="${image}" alt="hello"/>
  <div class="map-item-container">
    <h5>Number: ${id}</h5>
    <h5>Name: ${creator.name}</h5>
    <h5>Phone: ${creator.phone}</h5>
    <h5>Date: ${createdAt}</h5>
    <button class="map-item-btn" onclick="() => {alert('Hello')}" type="button">More</button>
  </div
</div>
`;
