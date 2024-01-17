
fetch("data.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("Err!")
    }
    return res.json();
  })
  .then(data => {
    const src = document.getElementById("category-template").innerHTML;
    const template = Handlebars.compile(src);
    const html = template({output_data: data})
    document.getElementById("category-output").innerHTML = html

    const categories = document.querySelectorAll(".category__card");
    categories.forEach((category, index) => {
      category.classList.toggle(`color-palette-${index+1}`);
    });

    const pointAccumulate = data.map(e => e.score).reduce((a, b) => a + b)
    const finalAvg = pointAccumulate / data.length
    const finalScore = document.getElementById("total-point");
    finalScore.innerText = Math.round(finalAvg);
  })
