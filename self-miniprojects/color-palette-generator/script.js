const swatchContainer = document.getElementById("js-swatch-container")

function RGBtoHSL(r, g, b) {
  r /= 255, g /= 255, b /= 255
  const cmax = Math.max(r, g, b)
  const cmin = Math.min(r, g, b)
  const cdelta = cmax - cmin

  let h, s, l;

  l = (cmax + cmin) / 2;

  if (cmax === cmin) {
    [h, s] = [0, 0]
  } else {
    switch (cmax) {
      case r:
        h = ((g - b) / cdelta) % 6
        break;
      case g:
        h = ((b - r) / cdelta) + 2
        break
      case b:
        h = ((r - g) / cdelta) + 4
        break;
      default:
        break;
    }
  
    h = Math.round(h * 60)
  
    s = l > 0.5 ? cdelta / (2 - cmax - cmin) : (cmax - cmin) / (cmax + cmin);
  }

  return [h, Math.round(s*100), Math.round(l*100)];
}

function generateSwatch(color, swatchIds) {
  swatchIds = `sw-${swatchIds}`
  const divElement = document.createElement("div")

  function generateShade() {
    let shade = "";
    for (let i = 1; i < 10; i++) {
      shade += `<div class="shade shade-${i} ${swatchIds}"></div>`;
    }
    return shade
  }
  
  divElement.className = `swatch ${swatchIds}`
  swatchContainer.appendChild(divElement)
  swatchContainer.lastElementChild.innerHTML = `
  <p>rgb(${color.join()})</p>
  <div class="color-container ${swatchIds}" >
    <div class="color-main"></div>
    <div class="shade-container ${swatchIds}">
      ${generateShade()}
    </div>
  </div>
  `
  const mainColor = document.querySelector(`.${swatchIds} .color-main`)
  mainColor.style.backgroundColor = `rgb(${color})`

  
  let hsl = RGBtoHSL(...color)
  for (let j = 1; j < 10; j++) {
    const shadeClass = document.querySelector(`.shade-${j}.${swatchIds}`)
    shadeClass.style.backgroundColor = `hsl(${hsl[0]} ${hsl[1]}% ${j * 10}%)`;
  }
}

const input = document.querySelector("#js-input");
const output = document.querySelector("#js-output")
let imageURL = "";

input.addEventListener("change", function() {
  swatchContainer.innerHTML = ""
  const reader = new FileReader();
  reader.addEventListener("load", function() {
    imageURL = reader.result;
    output.src = imageURL
    output.alt = "Uploaded Image"
  })
  reader.readAsDataURL(this.files[0])
})

const colorThief = new ColorThief()

output.addEventListener("load", function() {
  const getPalettes = colorThief.getPalette(output, 5);
  getPalettes.forEach((element, index) => {
    generateSwatch(element, index)
  });
})