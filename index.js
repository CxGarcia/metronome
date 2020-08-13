$(document).ready(() => {
  const slider = $("#slider");
  const beep = new Audio(
    "data:audio/flac;base64,ZkxhQwAAACIQABAAAARBAARBAfQBcAAAAZLfwZb9QVlTtnnZLOsaWczxhAAAKCAAAAByZWZlcmVuY2UgbGliRkxBQyAxLjMuMCAyMDEzMDUyNgAAAAD/+HQMAAGRJhgKxHRX63x+6QxXqTpCYAANDJgITNAmIhAB/5BgFt4iAfgBZHY4A9UZAAZ65QManTnQUAKnx8A+ZcwFun6gX1gMVIgAfaXgEml9KIzgfUBYAnhLwJl/Oek+A5rZADhx2ApN3s198CTrfAPyHMGRV3DcKAYAAwBJ7uA8wysUF8HYV6AUyIIKv/ObD0B7BRAOf6QFVnlVIrg0zuwGYTqCTP9rJXAWm4AC1HQDxVMnllwVg94CGPDDq6XrJRgQ2zwHp6wGR5tQFGh9dygZtwIXeHNK+AHAw8BZ34BSgBUY44Ze3IEt2uEhBfQg3BcaTA+MSB/rIUTNIUTWYN9hMdT2M/TYEg+cDC6KGzFJQAzj8TBBUujjHFLnsqB07TAj7JBa4qTwQY15pQ9rKxSdhzrJwxaKA3o/BKIsTkDYtGCwxtDRCIqzegQo2pAr9KD0mKmwtRJeuhMscnKzjNLLCC4CCDoYNaPiZmNPNIsdzTJkF0zHIRyDGDZzCLozKYLfNVZUYt6pWUiy7/Bjf5CyRUJ95iW1TLkIET7MJJU5yxARVwzCNBsIZHCVflJ5ZE+0K30dXKabEjNYdP+TulglDBSFPJNlCtxqLycmj5OeMkURsMFSXgrtnXLllFm5cySbjiZQKoshh0ASOArXdBJuJ9c2syJBjM8II1VJYFtSEVbCw3f80qnABkAClxxw8mPk8NdHt4q9gNy0UpWEuO2UUx3jZSuRqVkcoWnWIWa1ahV3Y3K5KbKMH879vqjUtUZMatwgfZeOMvsQlyisbQ71rIxGX9FhUSYvRHvF3xeunSYfQ4iRItSvuvzR5iO3xDFaEdARSGOC1fGIpY/hll/Z8dBI+J6u22KvVuDK2IiXW9V8Htkhxa94kLDPz25hsMC8qImvymxd70W8D5iDfsU9TYMYt5EIfJnAWr0bS7NbeHbQu6ZsuZyvTuhwMbc9XFv3q4b4amazBWwDvKfuyGSBrwrbr8+kkvhfZKs7C2FwoVooWXOnr/sWmZ5hWFSSpEtq0O6bjQhPR6Eguo8PmOz4SoKeIgpRmJZ1CEWpm1U6F/2UKJhBBJi0KeJ6kgEoPCeWSBmv85AOeDhOk/mJgciON6g0DZHbeVa7jIhYMBSP4ukvNIr36CvTjhkZCkWJk5godIxpiOjqiEnoJQ2K3HjKtYcY2CFWiXpIrqaGEIgef4gs+JXnhRm4GziHB2h/OIRB6BgfhgH4ap2DiTgVwIUN6FjaguFoE0uENThJRYJMOBCwg3zIOyKB00gOl4LXWC79gW14DOaCQAglUoEKCApZgc1YHC2AxzgJBoFcSBWWgICoBp+BEXgO64BeGAXYgMGoCoCAOYgEk4CGWAb5gB54A2SAWGgEfoAHyAINgDuYAkeAAbgBfoAgyAEEgAC4ARGADPgAf4AFyABYgAeIACGAAMgAaYAECABJgAagfd0="
  );
  let playing = false;
  let intervalMS;
  let id;

  // console.log(sldr.prop("step"));

  $("#play").on("click", (event) => {
    event.preventDefault();
    window.clearInterval(id);
    id = interval(intervalMS);
    playing = true;
  });

  $("#stop").on("click", (event) => {
    event.preventDefault();
    window.clearInterval(id);
    playing = false;
  });

  $("#slider").on("input", (event) => {
    event.preventDefault();
    let value = +event.target.value;
    intervalMS = 1000 / (value / 60); //get BPM
    $("#bpm").html(`${value}`);
    window.clearInterval(id);
    if (playing) id = interval(intervalMS);
  });

  $("#inc").on("click", (event) => {
    event.preventDefault();
    const newVal = parseInt(slider.val()) + parseInt(slider.prop("step"));
    slider.val(newVal);
    slider.trigger("input");
  });

  $("#dec").on("click", (event) => {
    event.preventDefault();
    const newVal = parseInt(slider.val()) - parseInt(slider.prop("step"));
    slider.val(newVal);
    slider.trigger("input");
  });

  function playBeep() {
    beep.play();
  }

  function interval(int = 666.66) {
    return setInterval(playBeep, int);
  }
});

function playTone() {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let osc = audioContext.createOscillator();
  let masterGainNode = audioContext.createGain();
  masterGainNode.connect(audioContext.destination);
  masterGainNode.gain.value = 0.5; // Set volume feature pending
  osc.connect(masterGainNode);

  osc.frequency.value = 400;
  osc.start();

  setTimeout(() => osc.stop(), 100);
  return osc;
}
