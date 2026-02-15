const products = {
    wheat: {
        workHours: 0.6,
        licenceUses: 1000,
        ingredients: { water: 0.15, electricity: 0.03 }
    },
    corn: {
        workHours: 0.6,
        licenceUses: 1000,
        ingredients: { water: 0.15, electricity: 0.03 }
    },
    bread: {
        workHours: 0.5,
        licenceUses: 600,
        ingredients: { WheatFlour: 0.1, water: 0.1, electricity: 0.05 }
    },
    coffeebeans: {
        workHours: 1.4,
        licenceUses: 100,
        ingredients: { water: 0.083, electricity: 0.2 }
    }
};



document.addEventListener("DOMContentLoaded", () => {

    const weeklyBoostCheck = document.getElementById("weeklyBoostCheck");
    if (weeklyBoostCheck) {
        weeklyBoostCheck.addEventListener("change", function () {
            const boostInputs = document.getElementById("boostInputs");
            if (boostInputs) {
                boostInputs.style.display = this.checked ? "block" : "none";
            }
        });
    }

    document.querySelectorAll('input[name="upgrade"]').forEach(radio => {
        radio.addEventListener('click', function () {
            if (this.wasChecked) {
                this.checked = false;
            }
            document.querySelectorAll('input[name="upgrade"]').forEach(r => r.wasChecked = r.checked);
        });
    });

    const btn = document.getElementById("calcBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            const resultText = document.getElementById("resultText");
            if (resultText) {
                resultText.textContent = calculateCostForPage();
            }
        });
    }

});


function calculateCostForPage() {

    const checkedProducts = Array.from(
        document.querySelectorAll(".productCheck:checked")
    ).map(el => el.value);

    if (checkedProducts.length === 0)
        return "Please select at least one product!";

    const HourlyWage = parseFloat(document.getElementById("HourlyWage")?.value) || 0;
    const WageTax = parseFloat(document.getElementById("WageTax")?.value) || 0;

    // نفس الـ IDs الأصلية
    const WaterCost = parseFloat(document.getElementById("WaterCost")?.value) || 0;
    const ElectricityCost = parseFloat(document.getElementById("ElectricityCost")?.value) || 0;
    const WheatFlourCost = parseFloat(document.getElementById("WheatFlourCost")?.value) || 0;

    const LicenceForm = parseFloat(document.getElementById("LicenceForm")?.value) || 0;
    const LocalGold = parseFloat(document.getElementById("LocalGold")?.value) || 1;
    const EuroGold = parseFloat(document.getElementById("EuroGold")?.value) || 0;

    const upgradeLevel =
        parseInt(document.querySelector('input[name="upgrade"]:checked')?.value) || 0;

    const weeklyBoost =
        document.getElementById("weeklyBoostCheck")?.checked || false;

    const BoostCost =
        parseFloat(document.getElementById("BoostCost")?.value) || 0;

    const WeeklyProduction =
        parseFloat(document.getElementById("WeeklyProduction")?.value) || 0;

    const productionMultiplier =
        1 + (upgradeLevel * 0.10);

    let results = [];

    checkedProducts.forEach(key => {

        const product = products[key];
        if (!product) return;

        const producedQuantity = 1 * productionMultiplier;

        const netHourlyWage =
            product.workHours * HourlyWage * (1 + WageTax / 100);

        const totalWage =
            netHourlyWage / LocalGold;

        const LicenceGoldPerProduct =
            (LicenceForm / product.licenceUses) +
            (EuroGold / product.licenceUses);

        const totalLicence =
            LicenceGoldPerProduct * producedQuantity;

        let totalIngredients = 0;

        if (product.ingredients.water) {
            totalIngredients +=
                WaterCost * product.ingredients.water * producedQuantity;
        }

        if (product.ingredients.electricity) {
            totalIngredients +=
                ElectricityCost * product.ingredients.electricity * producedQuantity;
        }

        if (product.ingredients.WheatFlour) {
            totalIngredients +=
                WheatFlourCost * product.ingredients.WheatFlour * producedQuantity;
        }

        let totalCost =
            totalWage +
            totalLicence +
            totalIngredients;

        let finalCost;

        if (weeklyBoost) {

            if (WeeklyProduction <= 0) {
                results.push(`${key}: Enter weekly production!`);
                return;
            }

            const effectiveQuantity =
                WeeklyProduction * 0.8;

            const costFor80Percent =
                totalCost * (effectiveQuantity / producedQuantity);

            const totalWithBoost =
                costFor80Percent + BoostCost;

            finalCost =
                totalWithBoost / WeeklyProduction;

            results.push(`${key}: ${finalCost.toFixed(4)} Gold (with boost)`);

        } else {

            finalCost =
                totalCost / producedQuantity;

            results.push(`${key}: ${finalCost.toFixed(4)} Gold`);
        }

    });

    return results.join("\n");
}
