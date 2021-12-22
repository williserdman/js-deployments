<script>
  export let data = {};

  function redirect() {
    window.location.href = data.link;
  }
</script>

<main>
  <div on:click={redirect} class="main-container">
    <img src={data.img} alt={data.imgAlt}>
    <h2>{data.name.toUpperCase()}</h2>
    <p>{data.meta}</p>
    <button>Check it Out!</button>
  </div>
</main>

<style>
  * {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    cursor: pointer;
  }

  main {
    border: 2px forestgreen solid;
    width: 400px;
    margin: auto;
    height: 40%;
    text-align: center;
    border-radius: 20px;
  }

  .main-container {
    margin: 20px;
    width: 90%;
    height: 40%;
    border-radius: 10px;
  }

  img {
    width: 100%;
    border-radius: 1px;
  }

  button:hover {
    background-color: purple;
  }

  button {
    background-color: forestgreen;
    color: #fff;
    border-radius: 20px;
    padding: 15px;
    font-weight: bold;
    font-size: 20px;
  }

  
</style>
