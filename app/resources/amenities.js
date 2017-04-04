var amenitiesType = {
        'basic': {
            'present': false,
            'name': 'Basic',
            'hrefLink': '#basic'
        },
        'convenience': {
            'present': false,
            'name': 'Convenience',
            'hrefLink': '#convenience'
        },
        'entertainment': {
            'present': false,
            'name': 'Entertainment',
            'hrefLink': '#entertainment'
        },
        'safety': {
            'present': false,
            'name': 'Safety',
            'hrefLink': '#safety'
        },
        'others': {
            'present': false,
            'name': 'Others',
            'hrefLink': '#others'
        },
        'sports': {
            'present': false,
            'name': 'Sports',
            'hrefLink': '#sports'
        }
    };



var amenities = {
        'basic': {
            'carParking': {
                name: 'Car Parking',
                img: 'images/icons/car-parking.png'
            },
            'cctv': {
                name: 'CCTV',
                img: 'images/icons/cctv.png'
            },
            'clubhouse': {
                name: 'Clubhouse',
                img: 'images/icons/clubhouse.png'
            },
            'fireProtection': {
                name: 'Fire Protection',
                img: 'images/icons/fire.png'
            },
            'gym': {
                name: 'Gym',
                img: 'images/icons/gym.png'
            },
            'intercom': {
                name: 'Intercom',
                img: 'images/icons/Intercom.png'
            },
            'kidsPlayArea': {
                name: 'Kids Play Area',
                img: 'images/icons/kidsPlayground.png'
            },
            'kidsPool': {
                name: 'Kids Pool',
                img: 'images/icons/Pool_2.png'
            },
            'lifts': {
                name: 'Lifts',
                img: 'images/icons/lift.png'
            },
            'parks': {
                name: 'Parks',
                img: 'images/icons/garden.png'
            },
            'powerBackup': {
                name: 'Power Backup',
                img: 'images/icons/power-backup.png'
            },
            'security': {
                name: 'Security 24X7',
                img: 'images/icons/group_full_security.png'
            },
            'swimmingPool': {
                name: 'Swimming Pool',
                img: 'images/icons/swiming-pool.png'
            },
            'videoPhone': {
                name: 'Video Phone',
                img: 'images/icons/smartphones.png'
            },
            'waterSupply': {
                name: 'Water Supply 24X7',
                img: 'images/icons/water3.png'
            }
        },
        'convenience': {
            'badmintonCourt': {
                name: 'Badminton Court',
                img: 'images/icons/Tennis_court.png'
            },
            'football': {
                name: 'Football',
                img: 'images/icons/basketball.png'
            },
            'inhouseChemist': {
                name: 'Inhouse Chemist',
                img: 'images/icons/Inhouse-chemist.png'
            },
            'inhouseGroceryStore': {
                name: 'Inhouse Grocery Store',
                img: 'images/icons/store.png'
            },
            'inhousePlaySchool': {
                name: 'Inhouse Play School',
                img: 'images/icons/Bookmark.png'
            },
            'inhouseRestaurant': {
                name: 'Inhouse Restaurant',
                img: 'images/icons/restaurant.png'
            },
            'multipurposeCourt': {
                name: 'Multipurpose Court',
                img: 'images/icons/court.png'
            },
            'squashCourt': {
                name: 'Squash Court',
                img: 'images/icons/balls-snooker.png'
            },
            'volleyball': {
                name: 'Volleyball',
                img: 'images/icons/Volleyball.png'
            }
        },
        'entertainment': {
            'amphitheatre': {
                name: 'Amphitheatre',
                img: 'images/icons/Amphitheatre.png'
            },
            'bowling': {
                name: 'Bowling',
                img: 'images/icons/bowling.png'
            },
            'cafe': {
                name: 'Cafe',
                img: 'images/icons/cafe.png'
            },
            'cardsRoom': {
                name: 'Cards Room',
                img: 'images/icons/card.png'
            },
            'jacuzzi': {
                name: 'Jacuzzi',
                img: 'images/icons/Jacuzzi.png'
            },
            'miniTheatre': {
                name: 'Mini Theatre',
                img: 'images/icons/Theatre.png'
            },
            'partyHall': {
                name: 'Party Hall',
                img: 'images/icons/hall.png'
            },
            'spaSteamSauna': {
                name: 'Spa',
                img: 'images/icons/spa.png'
            },
            'videoGames': {
                name: 'Video Games',
                img: 'images/icons/video-games.png'
            }
        },
        'safety': {
            'gatedCommunity': {
                name: 'Gated Community',
                img: 'images/icons/group2.png'
            },
            'guardAtLiftLobby': {
                name: 'Guard At Lift Lobby',
                img: 'images/icons/Elevator.png'
            },
            'guestAccomodation': {
                name: 'Guest Accomodation',
                img: 'images/icons/hotel.png'
            },
            'petArea': {
                name: 'Pet Area',
                img: 'images/icons/miscellaneous-62.png'
            },
            'smartCardBiometric': {
                name: 'SmartCard/Biometric',
                img: 'images/icons/smart-card.png'
            },
            'visitorParking': {
                name: 'Visitor Parking',
                img: 'images/icons/Parking.png'
            }
        },
        'others': {
            'indoorGames': {
                name: 'Indoor Games',
                img: 'images/icons/chess.png'
            },
            'library': {
                name: 'Library',
                img: 'images/icons/Library.png'
            },
            'maintenanceStaff': {
                name: 'Maintenance Staff',
                img: 'images/icons/group_full_security.png'
            },
            'rainWaterHarvesting': {
                name: 'Rain Water Harvesting',
                img: 'images/icons/weather-04.png'
            },
            'wasteDisposal': {
                name: 'Waste Disposal',
                img: 'images/icons/wastedisposal.png'
            }
        },
        'sports': {
            'basketballCourt': {
                name: 'Basketball Court',
                img: 'images/icons/basketball.png'
            },
            'cricket': {
                name: 'Cricket',
                img: 'images/icons/cricket.png'
            },
            'golfCourseFacing': {
                name: 'Golf Course Facing',
                img: 'images/icons/1golf.png'
            },
            'golfPutting': {
                name: 'Golf Putting',
                img: 'images/icons/golf.png'
            },
            'joggingTrack': {
                name: 'Jogging Track',
                img: 'images/icons/walk.png'
            },
            'skatingRink': {
                name: 'Skating Rink',
                img: 'images/icons/icon-skate.png'
            },
            'snookerPool': {
                name: 'Snooker/Pool',
                img: 'images/icons/balls-snooker.png'
            },
            'tableTennis': {
                name: 'Table Tennis',
                img: 'images/icons/court.png'
            },
            'tennisCourt': {
                name: 'Tennis Court',
                img: 'images/icons/Tennis_court.png'
            }
        }
    };