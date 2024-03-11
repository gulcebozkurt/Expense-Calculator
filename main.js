//verileri çekme

const spendingInput = document.querySelector("#spending-input")
const priceInput = document.querySelector("#price-input")
const formBtn = document.querySelector(".btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const statusCheck = document.querySelector("#status-input")
const selectkFilter = document.querySelector("#filter-select")


formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectkFilter.addEventListener("change", handleFilter)

let total = 0;
function updateTotal(price) {
    total += Number(price);
    totalInfo.textContent = total;

}

//gider oluşturma

function addExpense(e) {
    e.preventDefault()

    if (!priceInput.value || !spendingInput.value) {
        alert("Boş Gider Eklenemez!")
        return
        //fonksiyonu durdurmak için
    }

    //kullanıcı veri girdiğinde div oluştur
    const spendingDiv = document.createElement("div");

    //class ekleme
    spendingDiv.classList.add("spending")

    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");
    }

    //içeriği ayarlama
    spendingDiv.innerHTML = ` 
<h2>${spendingInput.value} =</h2>
<h2 id="value">${priceInput.value}</h2>
<div class="buttons">
  <img id ="payment" src="img/payment.png" alt="" />
  <img id ="remove"  src="img/delete.png" alt="" />
</div>`

    //listeye eleman ekleme
    list.appendChild(spendingDiv);

    updateTotal(priceInput.value)

    //formu temizleme
    spendingInput.value = "";
    priceInput.value = "";

}
function handleClick(e) {
    const element = e.target

    if (element.id === "remove") {
        //kapsayıcının kapsayıcısına ulaşma
        const wrapper = element.parentElement.parentElement

        //silinen elemanın fiyatını alma
        const deletedPrice = wrapper.querySelector("#value").innerText
        Number(deletedPrice.innerText);

        //silinenin fiyatını toplamdan çıkarma
        updateTotal(- Number(deletedPrice))

        //kapsayıcıyı kaldırma
        wrapper.remove()
    }
}

//filtreleme
function handleFilter(e) {
    console.log(e.target.value)

    const items = list.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex"
                break;

            case "payed":
                //sadece classında payed olanları sil
                if (!item.classList.contains("payed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex"
                }
                break;
            case "not-payed":
                if (item.classList.contains("payed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex"
                }
                break;
        }
    })
}