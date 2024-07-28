function toggleSearchbar() {
    const searchbar = document.getElementById('searchbar')
    searchbar.style.display = searchbar.style.display === 'block' ? 'none' : 'block'
}

document.addEventListener("DOMContentLoaded", () => {
    LanguageSelector()
    CookiesBannerManager()
    controlBottomMenu()
});

function handleLanguageDropdown() {
    const langToggle = document.querySelector('.lang_toggle')
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const dropdown = langToggle.querySelector('.language-dropdown')
            if (dropdown) {
                dropdown.classList.toggle('show')
            }
        });

        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target)) {
                const dropdown = langToggle.querySelector('.language-dropdown');
                if (dropdown && dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }
}

function CookiesBannerManager() {
    const cookiesWrapper = document.querySelector('.cookies_wrapper')
    const acceptButton = cookiesWrapper?.querySelector('.arrow-link')

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            cookiesWrapper.style.display = 'none';
            writeCookie('cookiesAccepted', 'true', 365)
        })

        if (!loadCookie('cookiesAccepted')) {
            cookiesWrapper.style.display = 'flex'
        } else {
            cookiesWrapper.style.display = 'none'
        }
    }
}

function controlBottomMenu() {
    const bottomMenuTrigger = document.querySelector('.buttom-menu_trigger')

    if (bottomMenuTrigger) {
        bottomMenuTrigger.addEventListener('click', () => {
            console.log('Bottom menu triggered');
        });
    }
}

function writeCookie(name, value, days) {
    let expires = ""
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function loadCookie(name) { 
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

const pTexts = [
    `თიბისი კონცეპტის ციფრული ნაკრები განკუთვნილია მათთვის,
    ვისთვისაც <strong>საბანკო მომსახურებით სარგებლობა
    ყოველდღიურობის ნაწილია</strong>, ვინც აქტიურად
    მოიხმარს <strong>არასაბანკო პროდუქტებსა და
    შეთავაზებებს</strong> და ვისაც ურჩევნია
    დამოუკიდებლად, <strong>პირადი ბანკირის გარეშე</strong>
    მართოს საკუთარი ფინანსები და საბანკო ოპერაციები.`,
    `თიბისი კონცეპტის მომხმარებლებთან ურთიერთობის ერთ-ერთი ფორმატი - <strong>პრემიუმ 
    ნაკრები</strong>, სხვა საბანკო და არასაბანკო უპირატესობებთან ერთად <strong>პირადი ბანკირის 
    მომსახურებას</strong> გულისხმობს. პირადი ბანკირის მთავარი ამოცანა მომხარებლისთვის ცხოვრების 
    გამარტივება და მისთვის უმაღლესი ხარისხის მომსახურების უზრუნველყოფაა.`,
    `<strong>თიბისი კონცეპტის 360</strong> ნაკრები
    განკუთვნილია მათთვის, ვისაც სხვა საბანკო და არასაბანკო
    უპიტარესობებთან ერთად, კიდევ უფრო <strong>მეტი ფინანსური
    ინსტრუმენტი</strong> და <strong>გაზრდილი
    შესაძლებლობები</strong> ესაჭიროება.`
]

const pIds = ["p_text_1","p_text_2","p_text_3"]

pIds.forEach((id, index) => {
    const p = document.getElementById(id)
    const pElement = document.createElement('p')
    pElement.innerHTML = pTexts[index]
    p.appendChild(pElement)
})

const swiper = new Swiper('.swiper', {
    loop: false,
    grabCursor: true,
    spaceBetween: true,
    spaceBetween: 15,
  

    // Navigation arrows
    navigation: {
      nextEl: '.main-slider-next',
      prevEl: '.main-slider-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper_scrollbar',
      draggable: true,
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
  })

  function dropdownFunction(element) {
    const headerDropdownBg = document.getElementById("header_dropdown-bg")
    const dropdowns = document.getElementsByClassName('header_dropdown-list')
    const dropdownToggles = document.getElementsByClassName('header_dropdown-toggle')
    const dropdownList = element.nextElementSibling
    const isActive = dropdownList.classList.contains('active')

    if (isActive) {
        headerDropdownBg.classList.add('fade-leave-active')
        headerDropdownBg.classList.remove('fade-enter-active')
    } else {
        headerDropdownBg.classList.add('fade-leave-active')
        setTimeout(() => {
            headerDropdownBg.classList.remove('d-block')
            headerDropdownBg.classList.remove('fade-leave-active')
            setTimeout(() => {
                headerDropdownBg.classList.add('fade-enter-active')
                headerDropdownBg.classList.add('d-block')
            }, 10)
        }, 500)
    }
    
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('active')
        dropdownToggles[i].querySelector('.header_dropdown-line').classList.remove('active')
    }
    
    if (!isActive) {
        dropdownList.classList.add('active')
        element.querySelector('.header_dropdown-line').classList.add('active')
    }
}

document.addEventListener('click', function(event) {
    const headerDropdownBg = document.getElementById("header_dropdown-bg")
    const dropdowns = document.getElementsByClassName('header_dropdown-list')
    const dropdownToggles = document.getElementsByClassName('header_dropdown-toggle')
    let isClickInside = false;

    for (let i = 0; i < dropdownToggles.length; i++) {
        if (dropdownToggles[i].contains(event.target)) {
            isClickInside = true
            break
        }
    }

    if (!isClickInside) {
        headerDropdownBg.classList.add('fade-leave-active')
        headerDropdownBg.classList.remove('fade-enter-active')
        setTimeout(() => {
            headerDropdownBg.classList.remove("d-block")
            headerDropdownBg.classList.remove('fade-leave-active')
        }, 500);
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('active')
            dropdownToggles[i].querySelector('.header_dropdown-line').classList.remove('active')
        }
    }
})

// Arrow active
document.addEventListener('DOMContentLoaded', function() {
    var divElements = document.querySelectorAll('.footer_dropdown-toggle');
    divElements.forEach(function(divElement) {
        divElement.addEventListener('click', function() {
            var dropdownList = this.closest('.footer_dropdown').querySelector('#footer_dropdown-list-div')
            var currentArrow = this.closest('.footer_dropdown').querySelector('.footer_dropdown-arrow')
            document.querySelectorAll('.footer_dropdown-arrow').forEach(function(arrow) {
                if (arrow !== currentArrow) {
                    arrow.classList.remove('active')
                }
            })
            currentArrow.classList.toggle('active')
            dropdownList.classList.toggle('active')
            this.classList.toggle('active')
        });
    });
});

// Mobile menu
document.getElementById('d_block').onclick = function() {
    const headerMenuMobile = document.querySelector('.header_menu-mobile')
    headerMenuMobile.classList.toggle('d-block')
    this.classList.toggle('active')
}

// Mobile menu dropdown

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.header_mobile-dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const dropdownList = this.closest('.header_mobile-dropdown').querySelector('.header_mobile_dropdown-list-div');
            const dropdownListNav = this.closest('.header_mobile-dropdown').querySelector('.header_mobile-dropdown-list');
            const currentArrow = this.querySelector('.header_mobile-dropdown-arr');

            document.querySelectorAll('.header_mobile-dropdown-arr').forEach(function(arrow) {
                if (arrow !== currentArrow) {
                    arrow.classList.remove('active');
                }
            });

            currentArrow.classList.toggle('active');
            dropdownList.classList.toggle('active');
            dropdownListNav.classList.toggle('d-block')
            this.classList.toggle('active');
        });
    });
});

