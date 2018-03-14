window.navigation = window.navigation || {},
    function(n) {
        navigation.menu = {
            constants: {
                sectionTemplate: '.section-template',
                contentContainer: '#wrapper',
                startSectionMenuItem: '#login-topbar',
                startSection: '#login'
            },

            importSectionsToDOM: function() {
                const links = document.querySelectorAll('link[rel="import"]');
                Array.prototype.forEach.call(links, function (link) {
                    let template = link.import.querySelector(navigation.menu.constants.sectionTemplate);
                    let clone = document.importNode(template.content, true);
                    document.querySelector(navigation.menu.constants.contentContainer).appendChild(clone)
                })
            },

            setMenuOnClickEvent: function () {
                document.body.addEventListener('click', function (event) {
                    if (event.target.dataset.section) {
                        navigation.menu.hideAllSections();
                        navigation.menu.showSection(event)
                    }
                })
            },

            showSection: function(event) {
                const sectionId = event.target.dataset.section;
                if (sectionId == "mytodolist"){
                    ////Show Current Room
                    //Set the current Room for the todo_ lists
                    let rowNumber = $('[data-value]').length - 1;
                    let dataRoom_id = $('[data-value]')[rowNumber].attributes[4].nodeValue;
                    localStorage.setItem('currentRoom', dataRoom_id);
                    $.get("http://192.168.33.10:8000/api/room/" + localStorage.getItem('currentRoom') + "/",{Authorization: localStorage.getItem('token')}, function(data){
                        console.log(data);
                    });
                    $('#' + sectionId).show();
                    $('#' + sectionId + ' section').show()

                } else {
                    $('#' + sectionId).show();
                    $('#' + sectionId + ' section').show()
                }
            },

            showStartSection: function() {
                $(this.constants.startSectionMenuItem).click();
                $(this.constants.startSection).show();
                $(this.constants.startSection + ' section').show()
            },

            hideAllSections: function() {
                $(this.constants.contentContainer + ' section').hide()
            },

            init: function() {
                this.importSectionsToDOM();
                this.setMenuOnClickEvent();
                this.showStartSection()
            }
        };

        n(function() {
            navigation.menu.init()
        })

    }(jQuery);