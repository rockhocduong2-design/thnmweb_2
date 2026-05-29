
document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.product-item');

    const filterSections = document.querySelectorAll('.filter-section');

    const brandCheckboxes = filterSections[0].querySelectorAll('input[type="checkbox"]');
    const typeCheckboxes = filterSections[3].querySelectorAll('input[type="checkbox"]');

    const colorDots = document.querySelectorAll('.color-filter-dots .color-dot');
    const sizeItems = document.querySelectorAll('.size-grid .size-item');
    const clearAllBtn = document.getElementById('clear-all-filters');

    function filterProducts() {
        let selectedBrands = Array.from(brandCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());

        let selectedTypes = Array.from(typeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());

        let selectedColors = Array.from(colorDots)
            .filter(dot => dot.classList.contains('active-filter'))
            .map(dot => dot.getAttribute('data-color'));

        let selectedSizes = Array.from(sizeItems)
            .filter(item => item.classList.contains('active-filter'))
            .map(item => item.innerText.trim());

        products.forEach(product => {
            let productBrand = product.getAttribute('data-brand');
            let productColors = product.getAttribute('data-color') || "";
            let productType = product.getAttribute('data-type') || "";
            let productSize = product.getAttribute('data-size') || "";

            let brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
            let colorMatch = selectedColors.length === 0 || selectedColors.some(color => productColors.includes(color));
            let typeMatch = selectedTypes.length === 0 || selectedTypes.some(type => productType.includes(type));

            let sizeArray = productSize.split(' ');
            let sizeMatch = selectedSizes.length === 0 || selectedSizes.some(size => sizeArray.includes(size));

            if (brandMatch && colorMatch && typeMatch && sizeMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    [...brandCheckboxes, ...typeCheckboxes].forEach(cb => {
        cb.addEventListener('change', filterProducts);
    });

    colorDots.forEach(dot => {
        dot.addEventListener('click', function () {
            this.classList.toggle('active-filter');
            filterProducts();
        });
    });
    sizeItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('active-filter');
            filterProducts();
        });
    });

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function (e) {
            e.preventDefault();

            [...brandCheckboxes, ...typeCheckboxes].forEach(cb => cb.checked = false);

            colorDots.forEach(dot => dot.classList.remove('active-filter'));
            sizeItems.forEach(item => item.classList.remove('active-filter'));

            filterProducts();
        });
    }


    const sortSelect = document.getElementById('sort-select');
    const productList = document.getElementById('product-list');

    if (sortSelect && productList) {
        sortSelect.addEventListener('change', function () {
            let sortType = this.value;
            let productsArray = Array.from(productList.querySelectorAll('.product-item'));

            productsArray.sort((a, b) => {
                let priceA = parseInt(a.getAttribute('data-price'));
                let priceB = parseInt(b.getAttribute('data-price'));
                let orderA = parseInt(a.getAttribute('data-order'));
                let orderB = parseInt(b.getAttribute('data-order'));

                if (sortType === 'price-asc') {
                    return priceA - priceB;
                } else if (sortType === 'price-desc') {
                    return priceB - priceA;
                } else {
                    return orderA - orderB;
                }
            });

            productList.innerHTML = '';
            productsArray.forEach(product => {
                productList.appendChild(product);
            });
        });
    }

    const hotlineBtn = document.getElementById('hotline-btn');

    if (hotlineBtn) {
         hotlineBtn.addEventListener('click', function() {
        alert("Cảm ơn bạn đã quan tâm đến Shop Giày Của Tui!\n\nVui lòng gọi đến số Hotline: 1900.xxxx.xx để được hỗ trợ nhanh nhất nhé.");
        });
    }
});
