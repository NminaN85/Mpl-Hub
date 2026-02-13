
export function calculateHourlyWageInGold() {
    const hourlyWage = parseFloat(document.getElementById("HourlyWage").value) || 0;
    const wageTax = parseFloat(document.getElementById("WageTax").value) || 0;
    const localGoldRate = parseFloat(document.getElementById("LocalGold").value) || 1;

    const netWage = hourlyWage * (1 - wageTax / 100);

    const wageInGold = netWage / localGoldRate;

    return wageInGold;
}


// الفانكشن لحساب نصيب كل منتج من الرخصة وتحويله للـ Gold
export function calculateLicenseCostPerProduct(numberOfProducts) {
    // قيمة الرخصة ثابتة باليورو لكل مجموعة منتجات
    const licenseEuroPerSet = 1; // 1 يورو للمجموعة

    // جلب قيمة التحويل من يورو إلى جولد
    const euroToGoldRate = parseFloat(document.getElementById("EuroGold").value) || 1;

    // نصيب المنتج الواحد باليورو
    const costPerProductEuro = licenseEuroPerSet / numberOfProducts;

    // التحويل للـ Gold
    const costPerProductGold = costPerProductEuro / euroToGoldRate;

    return costPerProductGold;
}


