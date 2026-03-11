// Car Builder Application with Backend Integration
class CarBuilder {
    constructor() {
        this.baseStats = {
            hp: 200,
            torque: 200,
            weight: 3000,
            camber: 0,
            height: 'Stock',
            topSpeed: 130
        };
        
        this.currentStats = { ...this.baseStats };
        this.selectedParts = [];
        this.hasSuspension = false;
        this.currentUser = null;
        this.token = null;
        this.carImageData = null;
        this.carDetails = {
            make: '',
            model: '',
            year: '',
            color: ''
        };
        
        this.apiBase = 'http://localhost:5000/api';
        
        // Car generations database
        this.carGenerations = {
            'Toyota': {
                'Camry': [
                    { name: '1st Generation', years: '1983-1986' },
                    { name: '2nd Generation', years: '1987-1991' },
                    { name: '3rd Generation', years: '1992-1996' },
                    { name: '4th Generation', years: '1997-2001' },
                    { name: '5th Generation', years: '2002-2006' },
                    { name: '6th Generation', years: '2007-2011' },
                    { name: '7th Generation', years: '2012-2017' },
                    { name: '8th Generation', years: '2018-Present' }
                ],
                'Corolla': [
                    { name: '1st Generation', years: '1966-1970' },
                    { name: '2nd Generation', years: '1971-1974' },
                    { name: '3rd Generation', years: '1975-1979' },
                    { name: '4th Generation', years: '1980-1983' },
                    { name: '5th Generation', years: '1984-1987' },
                    { name: '6th Generation', years: '1988-1992' },
                    { name: '7th Generation', years: '1993-1997' },
                    { name: '8th Generation', years: '1998-2002' },
                    { name: '9th Generation', years: '2003-2008' },
                    { name: '10th Generation', years: '2009-2013' },
                    { name: '11th Generation', years: '2014-2019' },
                    { name: '12th Generation', years: '2020-Present' }
                ],
                'Supra': [
                    { name: '1st Generation', years: '1978-1981' },
                    { name: '2nd Generation', years: '1982-1986' },
                    { name: '3rd Generation', years: '1986-1993' },
                    { name: '4th Generation', years: '1993-2002' },
                    { name: '5th Generation', years: '2019-Present' }
                ],
                'Prius': [
                    { name: '1st Generation', years: '1997-2003' },
                    { name: '2nd Generation', years: '2003-2009' },
                    { name: '3rd Generation', years: '2009-2015' },
                    { name: '4th Generation', years: '2015-Present' }
                ],
                'RAV4': [
                    { name: '1st Generation', years: '1994-2000' },
                    { name: '2nd Generation', years: '2000-2005' },
                    { name: '3rd Generation', years: '2005-2012' },
                    { name: '4th Generation', years: '2012-2018' },
                    { name: '5th Generation', years: '2018-Present' }
                ],
                'Highlander': [
                    { name: '1st Generation', years: '2001-2007' },
                    { name: '2nd Generation', years: '2007-2013' },
                    { name: '3rd Generation', years: '2013-2019' },
                    { name: '4th Generation', years: '2019-Present' }
                ],
                'Tacoma': [
                    { name: '1st Generation', years: '1995-2004' },
                    { name: '2nd Generation', years: '2004-2015' },
                    { name: '3rd Generation', years: '2015-Present' }
                ],
                'Tundra': [
                    { name: '1st Generation', years: '1999-2006' },
                    { name: '2nd Generation', years: '2006-2021' },
                    { name: '3rd Generation', years: '2021-Present' }
                ],
                'Sienna': [
                    { name: '1st Generation', years: '1997-2003' },
                    { name: '2nd Generation', years: '2003-2010' },
                    { name: '3rd Generation', years: '2010-2020' },
                    { name: '4th Generation', years: '2020-Present' }
                ],
                '4Runner': [
                    { name: '1st Generation', years: '1984-1989' },
                    { name: '2nd Generation', years: '1989-1995' },
                    { name: '3rd Generation', years: '1995-2002' },
                    { name: '4th Generation', years: '2002-2009' },
                    { name: '5th Generation', years: '2009-Present' }
                ],
                'Yaris': [
                    { name: '1st Generation', years: '1999-2005' },
                    { name: '2nd Generation', years: '2005-2011' },
                    { name: '3rd Generation', years: '2011-2019' },
                    { name: '4th Generation', years: '2019-Present' }
                ]
            },
            'Honda': {
                'Civic': [
                    { name: '1st Generation', years: '1973-1979' },
                    { name: '2nd Generation', years: '1980-1983' },
                    { name: '3rd Generation', years: '1984-1987' },
                    { name: '4th Generation', years: '1988-1991' },
                    { name: '5th Generation', years: '1992-1995' },
                    { name: '6th Generation', years: '1996-2000' },
                    { name: '7th Generation', years: '2001-2005' },
                    { name: '8th Generation', years: '2006-2011' },
                    { name: '9th Generation', years: '2012-2015' },
                    { name: '10th Generation', years: '2016-2021' },
                    { name: '11th Generation', years: '2022-Present' }
                ],
                'Accord': [
                    { name: '1st Generation', years: '1976-1981' },
                    { name: '2nd Generation', years: '1982-1985' },
                    { name: '3rd Generation', years: '1986-1989' },
                    { name: '4th Generation', years: '1990-1993' },
                    { name: '5th Generation', years: '1994-1997' },
                    { name: '6th Generation', years: '1998-2002' },
                    { name: '7th Generation', years: '2003-2007' },
                    { name: '8th Generation', years: '2008-2012' },
                    { name: '9th Generation', years: '2013-2017' },
                    { name: '10th Generation', years: '2018-2022' },
                    { name: '11th Generation', years: '2023-Present' }
                ],
                'CR-V': [
                    { name: '1st Generation', years: '1995-2001' },
                    { name: '2nd Generation', years: '2001-2006' },
                    { name: '3rd Generation', years: '2006-2011' },
                    { name: '4th Generation', years: '2011-2016' },
                    { name: '5th Generation', years: '2016-2022' },
                    { name: '6th Generation', years: '2022-Present' }
                ],
                'Prelude': [
                    { name: '1st Generation', years: '1978-1982' },
                    { name: '2nd Generation', years: '1983-1987' },
                    { name: '3rd Generation', years: '1988-1991' },
                    { name: '4th Generation', years: '1992-1996' },
                    { name: '5th Generation', years: '1997-2001' }
                ],
                'Fit': [
                    { name: '1st Generation', years: '2001-2007' },
                    { name: '2nd Generation', years: '2007-2013' },
                    { name: '3rd Generation', years: '2013-2019' },
                    { name: '4th Generation', years: '2019-Present' }
                ],
                'HR-V': [
                    { name: '1st Generation', years: '2015-2021' },
                    { name: '2nd Generation', years: '2021-Present' }
                ],
                'Pilot': [
                    { name: '1st Generation', years: '2002-2008' },
                    { name: '2nd Generation', years: '2008-2015' },
                    { name: '3rd Generation', years: '2015-2022' },
                    { name: '4th Generation', years: '2022-Present' }
                ],
                'Odyssey': [
                    { name: '1st Generation', years: '1994-1998' },
                    { name: '2nd Generation', years: '1998-2004' },
                    { name: '3rd Generation', years: '2004-2010' },
                    { name: '4th Generation', years: '2010-2017' },
                    { name: '5th Generation', years: '2017-Present' }
                ],
                'Element': [
                    { name: '1st Generation', years: '2002-2011' }
                ],
                'Ridgeline': [
                    { name: '1st Generation', years: '2005-2014' },
                    { name: '2nd Generation', years: '2016-Present' }
                ],
                'Insight': [
                    { name: '1st Generation', years: '1999-2006' },
                    { name: '2nd Generation', years: '2009-2014' },
                    { name: '3rd Generation', years: '2018-Present' }
                ],
                'Beat': [
                    { name: '1st Generation', years: '2018-Present' }
                ],
                'City': [
                    { name: '1st Generation', years: '1981-1986' },
                    { name: '2nd Generation', years: '1986-1994' },
                    { name: '3rd Generation', years: '1996-2002' },
                    { name: '4th Generation', years: '2002-2008' },
                    { name: '5th Generation', years: '2008-2013' },
                    { name: '6th Generation', years: '2013-Present' }
                ]
            },
            'Ford': {
                'Mustang': [
                    { name: '1st Generation', years: '1965-1973' },
                    { name: '2nd Generation', years: '1974-1978' },
                    { name: '3rd Generation', years: '1979-1993' },
                    { name: '4th Generation', years: '1994-2004' },
                    { name: '5th Generation', years: '2005-2014' },
                    { name: '6th Generation', years: '2015-Present' }
                ],
                'Focus': [
                    { name: '1st Generation', years: '1998-2004' },
                    { name: '2nd Generation', years: '2005-2011' },
                    { name: '3rd Generation', years: '2012-2018' },
                    { name: '4th Generation', years: '2019-Present' }
                ],
                'F-150': [
                    { name: '1st Generation', years: '1948-1952' },
                    { name: '2nd Generation', years: '1953-1956' },
                    { name: '3rd Generation', years: '1957-1960' },
                    { name: '4th Generation', years: '1961-1966' },
                    { name: '5th Generation', years: '1967-1972' },
                    { name: '6th Generation', years: '1973-1979' },
                    { name: '7th Generation', years: '1980-1986' },
                    { name: '8th Generation', years: '1987-1991' },
                    { name: '9th Generation', years: '1992-1996' },
                    { name: '10th Generation', years: '1997-2003' },
                    { name: '11th Generation', years: '2004-2008' },
                    { name: '12th Generation', years: '2009-2014' },
                    { name: '13th Generation', years: '2015-2020' },
                    { name: '14th Generation', years: '2021-Present' }
                ],
                'Explorer': [
                    { name: '1st Generation', years: '1990-1994' },
                    { name: '2nd Generation', years: '1995-2001' },
                    { name: '3rd Generation', years: '2002-2005' },
                    { name: '4th Generation', years: '2006-2010' },
                    { name: '5th Generation', years: '2010-2019' },
                    { name: '6th Generation', years: '2019-Present' }
                ],
                'Escape': [
                    { name: '1st Generation', years: '2000-2007' },
                    { name: '2nd Generation', years: '2007-2012' },
                    { name: '3rd Generation', years: '2012-2019' },
                    { name: '4th Generation', years: '2019-Present' }
                ],
                'Fusion': [
                    { name: '1st Generation', years: '2005-2012' },
                    { name: '2nd Generation', years: '2012-2020' }
                ],
                'Edge': [
                    { name: '1st Generation', years: '2006-2014' },
                    { name: '2nd Generation', years: '2014-Present' }
                ],
                'Expedition': [
                    { name: '1st Generation', years: '1996-2002' },
                    { name: '2nd Generation', years: '2002-2006' },
                    { name: '3rd Generation', years: '2006-2017' },
                    { name: '4th Generation', years: '2017-Present' }
                ],
                'Ranger': [
                    { name: '1st Generation', years: '1983-2011' },
                    { name: '2nd Generation', years: '2019-Present' }
                ],
                'Bronco': [
                    { name: '1st Generation', years: '1966-1977' },
                    { name: '2nd Generation', years: '1978-1996' },
                    { name: '3rd Generation', years: '2020-Present' }
                ]
            },
            'Chevrolet': {
                'Camaro': [
                    { name: '1st Generation', years: '1967-1969' },
                    { name: '2nd Generation', years: '1970-1981' },
                    { name: '3rd Generation', years: '1982-1992' },
                    { name: '4th Generation', years: '1993-2002' },
                    { name: '5th Generation', years: '2010-2015' },
                    { name: '6th Generation', years: '2016-Present' }
                ],
                'Corvette': [
                    { name: 'C1', years: '1953-1962' },
                    { name: 'C2', years: '1963-1967' },
                    { name: 'C3', years: '1968-1982' },
                    { name: 'C4', years: '1984-1996' },
                    { name: 'C5', years: '1997-2004' },
                    { name: 'C6', years: '2005-2013' },
                    { name: 'C7', years: '2014-2019' },
                    { name: 'C8', years: '2020-Present' }
                ],
                'Silverado': [
                    { name: '1st Generation', years: '1999-2006' },
                    { name: '2nd Generation', years: '2007-2013' },
                    { name: '3rd Generation', years: '2014-2018' },
                    { name: '4th Generation', years: '2019-Present' }
                ],
                'Tahoe': [
                    { name: '1st Generation', years: '1994-1999' },
                    { name: '2nd Generation', years: '1999-2006' },
                    { name: '3rd Generation', years: '2006-2014' },
                    { name: '4th Generation', years: '2014-2020' },
                    { name: '5th Generation', years: '2020-Present' }
                ],
                'Suburban': [
                    { name: '1st Generation', years: '1935-1940' },
                    { name: '2nd Generation', years: '1941-1946' },
                    { name: '3rd Generation', years: '1947-1954' },
                    { name: '4th Generation', years: '1955-1959' },
                    { name: '5th Generation', years: '1960-1966' },
                    { name: '6th Generation', years: '1967-1972' },
                    { name: '7th Generation', years: '1973-1991' },
                    { name: '8th Generation', years: '1992-1999' },
                    { name: '9th Generation', years: '1999-2006' },
                    { name: '10th Generation', years: '2006-2014' },
                    { name: '11th Generation', years: '2014-2020' },
                    { name: '12th Generation', years: '2020-Present' }
                ],
                'Equinox': [
                    { name: '1st Generation', years: '2004-2009' },
                    { name: '2nd Generation', years: '2009-2017' },
                    { name: '3rd Generation', years: '2017-Present' }
                ],
                'Malibu': [
                    { name: '1st Generation', years: '1964-1967' },
                    { name: '2nd Generation', years: '1968-1972' },
                    { name: '3rd Generation', years: '1973-1977' },
                    { name: '4th Generation', years: '1978-1983' },
                    { name: '5th Generation', years: '1997-2003' },
                    { name: '6th Generation', years: '2004-2008' },
                    { name: '7th Generation', years: '2008-2012' },
                    { name: '8th Generation', years: '2012-2016' },
                    { name: '9th Generation', years: '2016-Present' }
                ],
                'Impala': [
                    { name: '1st Generation', years: '1958-1961' },
                    { name: '2nd Generation', years: '1962-1964' },
                    { name: '3rd Generation', years: '1965-1970' },
                    { name: '4th Generation', years: '1971-1976' },
                    { name: '5th Generation', years: '1977-1985' },
                    { name: '6th Generation', years: '1994-1996' },
                    { name: '7th Generation', years: '1999-2005' },
                    { name: '8th Generation', years: '2006-2013' },
                    { name: '9th Generation', years: '2014-2020' }
                ],
                'Traverse': [
                    { name: '1st Generation', years: '2008-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ]
            },
            'BMW': {
                '3 Series': [
                    { name: 'E21', years: '1975-1983' },
                    { name: 'E30', years: '1982-1994' },
                    { name: 'E36', years: '1990-2000' },
                    { name: 'E46', years: '1997-2006' },
                    { name: 'E90/E91/E92/E93', years: '2005-2013' },
                    { name: 'F30/F31/F34', years: '2012-2019' },
                    { name: 'G20/G21', years: '2019-Present' }
                ],
                '5 Series': [
                    { name: 'E12', years: '1972-1981' },
                    { name: 'E28', years: '1981-1988' },
                    { name: 'E34', years: '1988-1996' },
                    { name: 'E39', years: '1995-2003' },
                    { name: 'E60/E61', years: '2003-2010' },
                    { name: 'F10/F11', years: '2010-2017' },
                    { name: 'G30/G31', years: '2017-Present' }
                ],
                'M3': [
                    { name: 'E30 M3', years: '1986-1991' },
                    { name: 'E36 M3', years: '1992-1999' },
                    { name: 'E46 M3', years: '2000-2006' },
                    { name: 'E90/E92/E93 M3', years: '2007-2013' },
                    { name: 'F80 M3', years: '2014-2018' },
                    { name: 'G80 M3', years: '2021-Present' }
                ],
                'X3': [
                    { name: 'E83', years: '2003-2010' },
                    { name: 'F25', years: '2010-2017' },
                    { name: 'G01', years: '2017-Present' }
                ],
                'X5': [
                    { name: 'E53', years: '1999-2006' },
                    { name: 'E70', years: '2006-2013' },
                    { name: 'F15', years: '2013-2018' },
                    { name: 'G05', years: '2018-Present' }
                ],
                'Z4': [
                    { name: 'E85', years: '2002-2008' },
                    { name: 'E89', years: '2009-2016' },
                    { name: 'G29', years: '2018-Present' }
                ],
                'i3': [
                    { name: 'I01', years: '2013-2022' }
                ],
                'i8': [
                    { name: 'I12', years: '2014-2020' }
                ]
            },
            'Nissan': {
                'Skyline': [
                    { name: '1st Generation', years: '1957-1963' },
                    { name: '2nd Generation', years: '1963-1968' },
                    { name: '3rd Generation', years: '1968-1972' },
                    { name: 'C10', years: '1968-1972' },
                    { name: 'C110', years: '1972-1977' },
                    { name: 'C210', years: '1977-1981' },
                    { name: 'R30', years: '1981-1985' },
                    { name: 'R31', years: '1985-1989' },
                    { name: 'R32', years: '1989-1994' },
                    { name: 'R33', years: '1993-1998' },
                    { name: 'R34', years: '1998-2002' },
                    { name: 'V35', years: '2001-2007' },
                    { name: 'V36', years: '2007-2014' },
                    { name: 'V37', years: '2014-Present' }
                ],
                'GT-R': [
                    { name: 'R32 GT-R', years: '1989-1994' },
                    { name: 'R33 GT-R', years: '1993-1998' },
                    { name: 'R34 GT-R', years: '1999-2002' },
                    { name: 'R35 GT-R', years: '2007-Present' }
                ],
                '350Z': [
                    { name: 'Z33', years: '2002-2009' }
                ],
                '370Z': [
                    { name: 'Z34', years: '2009-2020' }
                ],
                'Sentra': [
                    { name: '1st Generation', years: '1982-1986' },
                    { name: '2nd Generation', years: '1986-1990' },
                    { name: '3rd Generation', years: '1990-1994' },
                    { name: '4th Generation', years: '1995-1999' },
                    { name: '5th Generation', years: '2000-2006' },
                    { name: '6th Generation', years: '2006-2012' },
                    { name: '7th Generation', years: '2012-2019' },
                    { name: '8th Generation', years: '2019-Present' }
                ],
                'Altima': [
                    { name: '1st Generation', years: '1992-1997' },
                    { name: '2nd Generation', years: '1997-2001' },
                    { name: '3rd Generation', years: '2001-2006' },
                    { name: '4th Generation', years: '2006-2012' },
                    { name: '5th Generation', years: '2012-2018' },
                    { name: '6th Generation', years: '2018-Present' }
                ],
                'Rogue': [
                    { name: '1st Generation', years: '2007-2013' },
                    { name: '2nd Generation', years: '2013-2020' },
                    { name: '3rd Generation', years: '2020-Present' }
                ],
                'Pathfinder': [
                    { name: '1st Generation', years: '1985-1994' },
                    { name: '2nd Generation', years: '1995-2004' },
                    { name: '3rd Generation', years: '2004-2012' },
                    { name: '4th Generation', years: '2012-2020' },
                    { name: '5th Generation', years: '2020-Present' }
                ],
                'Frontier': [
                    { name: '1st Generation', years: '1997-2004' },
                    { name: '2nd Generation', years: '2004-2021' },
                    { name: '3rd Generation', years: '2021-Present' }
                ],
                'Murano': [
                    { name: '1st Generation', years: '2002-2007' },
                    { name: '2nd Generation', years: '2007-2014' },
                    { name: '3rd Generation', years: '2014-Present' }
                ],
                'Maxima': [
                    { name: '1st Generation', years: '1981-1984' },
                    { name: '2nd Generation', years: '1984-1988' },
                    { name: '3rd Generation', years: '1988-1994' },
                    { name: '4th Generation', years: '1994-1999' },
                    { name: '5th Generation', years: '1999-2003' },
                    { name: '6th Generation', years: '2003-2008' },
                    { name: '7th Generation', years: '2008-2015' },
                    { name: '8th Generation', years: '2015-Present' }
                ],
                'Leaf': [
                    { name: '1st Generation', years: '2010-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ]
            },
            'Mazda': {
                'MX-5 Miata': [
                    { name: 'NA', years: '1989-1997' },
                    { name: 'NB', years: '1998-2005' },
                    { name: 'NC', years: '2005-2015' },
                    { name: 'ND', years: '2015-Present' }
                ],
                'RX-7': [
                    { name: 'SA/FB', years: '1978-1985' },
                    { name: 'FC', years: '1985-1991' },
                    { name: 'FD', years: '1992-2002' }
                ],
                'RX-8': [
                    { name: 'SE3P', years: '2003-2012' }
                ],
                'Mazda3': [
                    { name: '1st Generation', years: '2003-2008' },
                    { name: '2nd Generation', years: '2008-2013' },
                    { name: '3rd Generation', years: '2013-2018' },
                    { name: '4th Generation', years: '2018-Present' }
                ],
                'Mazda6': [
                    { name: '1st Generation', years: '2002-2008' },
                    { name: '2nd Generation', years: '2008-2012' },
                    { name: '3rd Generation', years: '2012-2021' },
                    { name: '4th Generation', years: '2021-Present' }
                ],
                'CX-5': [
                    { name: '1st Generation', years: '2012-2016' },
                    { name: '2nd Generation', years: '2016-Present' }
                ],
                'CX-9': [
                    { name: '1st Generation', years: '2006-2016' },
                    { name: '2nd Generation', years: '2016-Present' }
                ],
                'CX-3': [
                    { name: '1st Generation', years: '2014-2022' }
                ],
                'CX-30': [
                    { name: '1st Generation', years: '2019-Present' }
                ],
                'Tribute': [
                    { name: '1st Generation', years: '2000-2007' },
                    { name: '2nd Generation', years: '2007-2011' }
                ]
            },
            'Subaru': {
                'Impreza': [
                    { name: '1st Generation', years: '1992-2001' },
                    { name: '2nd Generation', years: '2001-2007' },
                    { name: '3rd Generation', years: '2007-2011' },
                    { name: '4th Generation', years: '2011-2016' },
                    { name: '5th Generation', years: '2017-Present' }
                ],
                'WRX': [
                    { name: 'GC8', years: '1992-2001' },
                    { name: 'GDA/GDB', years: '2002-2007' },
                    { name: 'GR/GV', years: '2008-2014' },
                    { name: 'VA', years: '2015-2021' },
                    { name: 'VB', years: '2022-Present' }
                ],
                'STI': [
                    { name: 'GC8 STI', years: '1994-2001' },
                    { name: 'GDA/GDB STI', years: '2002-2007' },
                    { name: 'GR/GV STI', years: '2008-2014' },
                    { name: 'VA STI', years: '2015-2021' },
                    { name: 'VB STI', years: '2022-Present' }
                ],
                'Outback': [
                    { name: '1st Generation', years: '1994-1999' },
                    { name: '2nd Generation', years: '1999-2004' },
                    { name: '3rd Generation', years: '2004-2009' },
                    { name: '4th Generation', years: '2009-2014' },
                    { name: '5th Generation', years: '2014-2019' },
                    { name: '6th Generation', years: '2019-Present' }
                ],
                'Forester': [
                    { name: '1st Generation', years: '1997-2002' },
                    { name: '2nd Generation', years: '2002-2008' },
                    { name: '3rd Generation', years: '2008-2012' },
                    { name: '4th Generation', years: '2012-2018' },
                    { name: '5th Generation', years: '2018-Present' }
                ],
                'Legacy': [
                    { name: '1st Generation', years: '1989-1994' },
                    { name: '2nd Generation', years: '1994-1999' },
                    { name: '3rd Generation', years: '1999-2003' },
                    { name: '4th Generation', years: '2003-2009' },
                    { name: '5th Generation', years: '2009-2014' },
                    { name: '6th Generation', years: '2014-2019' },
                    { name: '7th Generation', years: '2019-Present' }
                ],
                'Crosstrek': [
                    { name: '1st Generation', years: '2012-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ],
                'Ascent': [
                    { name: '1st Generation', years: '2018-Present' }
                ],
                'BRZ': [
                    { name: '1st Generation', years: '2012-2020' },
                    { name: '2nd Generation', years: '2021-Present' }
                ]
            },
            'Mitsubishi': {
                'Lancer Evolution': [
                    { name: 'Evolution I', years: '1992-1994' },
                    { name: 'Evolution II', years: '1994-1995' },
                    { name: 'Evolution III', years: '1995-1996' },
                    { name: 'Evolution IV', years: '1996-1998' },
                    { name: 'Evolution V', years: '1998-1999' },
                    { name: 'Evolution VI', years: '1999-2001' },
                    { name: 'Evolution VII', years: '2001-2003' },
                    { name: 'Evolution VIII', years: '2003-2005' },
                    { name: 'Evolution IX', years: '2005-2007' },
                    { name: 'Evolution X', years: '2007-2016' }
                ],
                'Eclipse': [
                    { name: '1st Generation', years: '1990-1994' },
                    { name: '2nd Generation', years: '1995-1999' },
                    { name: '3rd Generation', years: '2000-2005' },
                    { name: '4th Generation', years: '2006-2012' }
                ],
                'Lancer': [
                    { name: '1st Generation', years: '1973-1979' },
                    { name: '2nd Generation', years: '1979-1987' },
                    { name: '3rd Generation', years: '1987-1995' },
                    { name: '4th Generation', years: '1995-2000' },
                    { name: '5th Generation', years: '2000-2007' },
                    { name: '6th Generation', years: '2007-2017' },
                    { name: '7th Generation', years: '2017-Present' }
                ],
                'Outlander': [
                    { name: '1st Generation', years: '2001-2006' },
                    { name: '2nd Generation', years: '2006-2012' },
                    { name: '3rd Generation', years: '2012-Present' }
                ],
                'Mirage': [
                    { name: '1st Generation', years: '1978-1983' },
                    { name: '2nd Generation', years: '1983-1991' },
                    { name: '3rd Generation', years: '1991-1995' },
                    { name: '4th Generation', years: '1995-2000' },
                    { name: '5th Generation', years: '2000-2003' },
                    { name: '6th Generation', years: '2012-Present' }
                ],
                'Pajero/Montero': [
                    { name: '1st Generation', years: '1981-1991' },
                    { name: '2nd Generation', years: '1991-1999' },
                    { name: '3rd Generation', years: '1999-2006' },
                    { name: '4th Generation', years: '2006-2021' }
                ]
            },
            'Porsche': {
                '911': [
                    { name: 'Classic', years: '1963-1989' },
                    { name: '964', years: '1989-1994' },
                    { name: '993', years: '1994-1998' },
                    { name: '996', years: '1997-2006' },
                    { name: '997', years: '2004-2012' },
                    { name: '991', years: '2011-2019' },
                    { name: '992', years: '2019-Present' }
                ],
                'Cayman': [
                    { name: '987', years: '2005-2012' },
                    { name: '981', years: '2012-2016' },
                    { name: '718', years: '2016-Present' }
                ],
                'Boxster': [
                    { name: '986', years: '1996-2004' },
                    { name: '987', years: '2005-2012' },
                    { name: '981', years: '2012-2016' },
                    { name: '718', years: '2016-Present' }
                ],
                'Macan': [
                    { name: '1st Generation', years: '2013-Present' }
                ],
                'Cayenne': [
                    { name: '1st Generation', years: '2002-2010' },
                    { name: '2nd Generation', years: '2010-2018' },
                    { name: '3rd Generation', years: '2018-Present' }
                ],
                'Panamera': [
                    { name: '1st Generation', years: '2009-2016' },
                    { name: '2nd Generation', years: '2016-Present' }
                ],
                'Taycan': [
                    { name: '1st Generation', years: '2019-Present' }
                ]
            },
            'Mercedes-Benz': {
                'C-Class': [
                    { name: 'W202', years: '1993-2000' },
                    { name: 'W203', years: '2000-2007' },
                    { name: 'W204', years: '2007-2014' },
                    { name: 'W205', years: '2014-2021' },
                    { name: 'W206', years: '2021-Present' }
                ],
                'E-Class': [
                    { name: 'W124', years: '1985-1995' },
                    { name: 'W210', years: '1995-2002' },
                    { name: 'W211', years: '2002-2009' },
                    { name: 'W212', years: '2009-2016' },
                    { name: 'W213', years: '2016-Present' }
                ],
                'S-Class': [
                    { name: 'W140', years: '1991-1998' },
                    { name: 'W220', years: '1998-2005' },
                    { name: 'W221', years: '2005-2013' },
                    { name: 'W222', years: '2013-2020' },
                    { name: 'W223', years: '2020-Present' }
                ],
                'GLC': [
                    { name: 'X253', years: '2015-2022' },
                    { name: 'X254', years: '2022-Present' }
                ],
                'GLE': [
                    { name: 'W166', years: '2011-2018' },
                    { name: 'W167', years: '2018-Present' }
                ],
                'A-Class': [
                    { name: 'W168', years: '1997-2004' },
                    { name: 'W169', years: '2004-2011' },
                    { name: 'W176', years: '2012-2018' },
                    { name: 'W177', years: '2018-Present' }
                ],
                'CLA': [
                    { name: 'C117', years: '2013-2019' },
                    { name: 'C118', years: '2019-Present' }
                ],
                'SLK': [
                    { name: 'R170', years: '1996-2004' },
                    { name: 'R171', years: '2004-2011' },
                    { name: 'R172', years: '2011-2016' }
                ],
                'SLC': [
                    { name: 'R172', years: '2016-2020' }
                ]
            },
            'Audi': {
                'A4': [
                    { name: 'B5', years: '1994-2001' },
                    { name: 'B6', years: '2000-2006' },
                    { name: 'B7', years: '2004-2008' },
                    { name: 'B8', years: '2007-2015' },
                    { name: 'B9', years: '2015-Present' }
                ],
                'A6': [
                    { name: 'C4', years: '1994-1997' },
                    { name: 'C5', years: '1997-2004' },
                    { name: 'C6', years: '2004-2011' },
                    { name: 'C7', years: '2011-2018' },
                    { name: 'C8', years: '2018-Present' }
                ],
                'TT': [
                    { name: '8N', years: '1998-2006' },
                    { name: '8J', years: '2006-2014' },
                    { name: '8S', years: '2014-Present' }
                ],
                'Q5': [
                    { name: '1st Generation', years: '2008-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ],
                'Q7': [
                    { name: '1st Generation', years: '2005-2015' },
                    { name: '2nd Generation', years: '2015-Present' }
                ],
                'A3': [
                    { name: '1st Generation', years: '1996-2003' },
                    { name: '2nd Generation', years: '2003-2012' },
                    { name: '3rd Generation', years: '2012-2020' },
                    { name: '4th Generation', years: '2020-Present' }
                ],
                'A5': [
                    { name: '1st Generation', years: '2007-2016' },
                    { name: '2nd Generation', years: '2016-Present' }
                ],
                'A8': [
                    { name: 'D2', years: '1994-2002' },
                    { name: 'D3', years: '2002-2010' },
                    { name: 'D4', years: '2010-2017' },
                    { name: 'D5', years: '2017-Present' }
                ],
                'e-tron': [
                    { name: '1st Generation', years: '2018-Present' }
                ]
            },
            'Volkswagen': {
                'Golf': [
                    { name: 'Mk1', years: '1974-1983' },
                    { name: 'Mk2', years: '1983-1992' },
                    { name: 'Mk3', years: '1991-1997' },
                    { name: 'Mk4', years: '1997-2003' },
                    { name: 'Mk5', years: '2003-2008' },
                    { name: 'Mk6', years: '2008-2012' },
                    { name: 'Mk7', years: '2012-2019' },
                    { name: 'Mk8', years: '2019-Present' }
                ],
                'Jetta': [
                    { name: 'Mk1', years: '1979-1984' },
                    { name: 'Mk2', years: '1984-1992' },
                    { name: 'Mk3', years: '1992-1998' },
                    { name: 'Mk4', years: '1998-2005' },
                    { name: 'Mk5', years: '2005-2010' },
                    { name: 'Mk6', years: '2010-2018' },
                    { name: 'Mk7', years: '2018-Present' }
                ],
                'Beetle': [
                    { name: 'Classic', years: '1938-2003' },
                    { name: 'New Beetle', years: '1997-2011' },
                    { name: 'A5', years: '2011-2019' }
                ],
                'Passat': [
                    { name: 'B1', years: '1973-1980' },
                    { name: 'B2', years: '1980-1988' },
                    { name: 'B3', years: '1988-1993' },
                    { name: 'B4', years: '1993-1996' },
                    { name: 'B5', years: '1996-2005' },
                    { name: 'B6', years: '2005-2010' },
                    { name: 'B7', years: '2010-2014' },
                    { name: 'B8', years: '2014-Present' }
                ],
                'Tiguan': [
                    { name: '1st Generation', years: '2007-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ],
                'Atlas': [
                    { name: '1st Generation', years: '2017-Present' }
                ],
                'Polo': [
                    { name: 'Mk1', years: '1975-1979' },
                    { name: 'Mk2', years: '1979-1981' },
                    { name: 'Mk3', years: '1981-1994' },
                    { name: 'Mk4', years: '1994-2001' },
                    { name: 'Mk5', years: '2001-2009' },
                    { name: 'Mk6', years: '2009-2017' },
                    { name: 'Mk7', years: '2017-Present' }
                ],
                'Up!': [
                    { name: '1st Generation', years: '2011-Present' }
                ]
            },
            'Hyundai': {
                'Elantra': [
                    { name: '1st Generation', years: '1990-1995' },
                    { name: '2nd Generation', years: '1995-2000' },
                    { name: '3rd Generation', years: '2000-2006' },
                    { name: '4th Generation', years: '2006-2010' },
                    { name: '5th Generation', years: '2010-2015' },
                    { name: '6th Generation', years: '2015-2020' },
                    { name: '7th Generation', years: '2020-Present' }
                ],
                'Sonata': [
                    { name: '1st Generation', years: '1985-1988' },
                    { name: '2nd Generation', years: '1988-1994' },
                    { name: '3rd Generation', years: '1994-1998' },
                    { name: '4th Generation', years: '1998-2004' },
                    { name: '5th Generation', years: '2004-2010' },
                    { name: '6th Generation', years: '2010-2014' },
                    { name: '7th Generation', years: '2014-2019' },
                    { name: '8th Generation', years: '2019-Present' }
                ],
                'Tucson': [
                    { name: '1st Generation', years: '2004-2009' },
                    { name: '2nd Generation', years: '2009-2015' },
                    { name: '3rd Generation', years: '2015-2020' },
                    { name: '4th Generation', years: '2020-Present' }
                ],
                'Santa Fe': [
                    { name: '1st Generation', years: '2000-2006' },
                    { name: '2nd Generation', years: '2006-2012' },
                    { name: '3rd Generation', years: '2012-2018' },
                    { name: '4th Generation', years: '2018-Present' }
                ],
                'Accent': [
                    { name: '1st Generation', years: '1994-1999' },
                    { name: '2nd Generation', years: '1999-2005' },
                    { name: '3rd Generation', years: '2005-2011' },
                    { name: '4th Generation', years: '2011-2017' },
                    { name: '5th Generation', years: '2017-Present' }
                ],
                'Veloster': [
                    { name: '1st Generation', years: '2011-2017' },
                    { name: '2nd Generation', years: '2017-Present' }
                ],
                'Kona': [
                    { name: '1st Generation', years: '2017-Present' }
                ],
                'Palisade': [
                    { name: '1st Generation', years: '2018-Present' }
                ]
            },
            'Kia': {
                'Optima': [
                    { name: '1st Generation', years: '2000-2005' },
                    { name: '2nd Generation', years: '2005-2010' },
                    { name: '3rd Generation', years: '2010-2015' },
                    { name: '4th Generation', years: '2015-2019' },
                    { name: '5th Generation', years: '2019-Present' }
                ],
                'Sorento': [
                    { name: '1st Generation', years: '2002-2009' },
                    { name: '2nd Generation', years: '2009-2014' },
                    { name: '3rd Generation', years: '2014-2020' },
                    { name: '4th Generation', years: '2020-Present' }
                ],
                'Sportage': [
                    { name: '1st Generation', years: '1993-2002' },
                    { name: '2nd Generation', years: '2004-2010' },
                    { name: '3rd Generation', years: '2010-2015' },
                    { name: '4th Generation', years: '2015-2021' },
                    { name: '5th Generation', years: '2021-Present' }
                ],
                'Soul': [
                    { name: '1st Generation', years: '2008-2013' },
                    { name: '2nd Generation', years: '2013-2019' },
                    { name: '3rd Generation', years: '2019-Present' }
                ],
                'Forte': [
                    { name: '1st Generation', years: '2008-2013' },
                    { name: '2nd Generation', years: '2013-2018' },
                    { name: '3rd Generation', years: '2018-Present' }
                ],
                'Telluride': [
                    { name: '1st Generation', years: '2019-Present' }
                ],
                'Rio': [
                    { name: '1st Generation', years: '2000-2005' },
                    { name: '2nd Generation', years: '2005-2011' },
                    { name: '3rd Generation', years: '2011-2017' },
                    { name: '4th Generation', years: '2017-Present' }
                ]
            },
            'Lexus': {
                'ES': [
                    { name: '1st Generation', years: '1989-1991' },
                    { name: '2nd Generation', years: '1991-1996' },
                    { name: '3rd Generation', years: '1996-2001' },
                    { name: '4th Generation', years: '2001-2006' },
                    { name: '5th Generation', years: '2006-2012' },
                    { name: '6th Generation', years: '2012-2018' },
                    { name: '7th Generation', years: '2018-Present' }
                ],
                'LS': [
                    { name: '1st Generation', years: '1989-1994' },
                    { name: '2nd Generation', years: '1994-2000' },
                    { name: '3rd Generation', years: '2000-2006' },
                    { name: '4th Generation', years: '2006-2017' },
                    { name: '5th Generation', years: '2017-Present' }
                ],
                'RX': [
                    { name: '1st Generation', years: '1998-2003' },
                    { name: '2nd Generation', years: '2003-2009' },
                    { name: '3rd Generation', years: '2009-2015' },
                    { name: '4th Generation', years: '2015-Present' }
                ],
                'IS': [
                    { name: '1st Generation', years: '1998-2005' },
                    { name: '2nd Generation', years: '2005-2013' },
                    { name: '3rd Generation', years: '2013-Present' }
                ],
                'GS': [
                    { name: '1st Generation', years: '1991-1997' },
                    { name: '2nd Generation', years: '1997-2005' },
                    { name: '3rd Generation', years: '2005-2011' },
                    { name: '4th Generation', years: '2011-2020' }
                ],
                'NX': [
                    { name: '1st Generation', years: '2014-2021' },
                    { name: '2nd Generation', years: '2021-Present' }
                ]
            },
            'Infiniti': {
                'G-Series': [
                    { name: 'G20', years: '1990-1996' },
                    { name: 'G35', years: '2002-2008' },
                    { name: 'G37', years: '2008-2013' },
                    { name: 'Q60', years: '2013-Present' }
                ],
                'M-Series': [
                    { name: 'M30', years: '1989-1992' },
                    { name: 'M35', years: '2005-2010' },
                    { name: 'M37', years: '2010-2013' },
                    { name: 'Q70', years: '2013-Present' }
                ],
                'QX': [
                    { name: 'QX4', years: '1996-2002' },
                    { name: 'QX56', years: '2004-2010' },
                    { name: 'QX80', years: '2010-Present' }
                ],
                'FX': [
                    { name: 'FX35', years: '2002-2008' },
                    { name: 'FX37', years: '2008-2013' },
                    { name: 'FX50', years: '2008-2013' }
                ],
                'EX': [
                    { name: 'EX35', years: '2007-2010' },
                    { name: 'EX37', years: '2010-2013' },
                    { name: 'QX50', years: '2013-Present' }
                ]
            },
            'Acura': {
                'Integra': [
                    { name: '1st Generation', years: '1985-1989' },
                    { name: '2nd Generation', years: '1989-1993' },
                    { name: '3rd Generation', years: '1993-2001' },
                    { name: '4th Generation', years: '2001-2006' }
                ],
                'RSX': [
                    { name: '1st Generation', years: '2001-2006' }
                ],
                'TSX': [
                    { name: '1st Generation', years: '2003-2008' },
                    { name: '2nd Generation', years: '2008-2014' }
                ],
                'TL': [
                    { name: '1st Generation', years: '1995-1998' },
                    { name: '2nd Generation', years: '1998-2003' },
                    { name: '3rd Generation', years: '2003-2008' },
                    { name: '4th Generation', years: '2008-2014' }
                ],
                'MDX': [
                    { name: '1st Generation', years: '2000-2006' },
                    { name: '2nd Generation', years: '2006-2013' },
                    { name: '3rd Generation', years: '2013-2020' },
                    { name: '4th Generation', years: '2021-Present' }
                ],
                'RDX': [
                    { name: '1st Generation', years: '2006-2012' },
                    { name: '2nd Generation', years: '2012-2018' },
                    { name: '3rd Generation', years: '2018-Present' }
                ],
                'NSX': [
                    { name: '1st Generation', years: '1990-2005' },
                    { name: '2nd Generation', years: '2016-Present' }
                ]
            },
            'Tesla': {
                'Model S': [
                    { name: '1st Generation', years: '2012-Present' }
                ],
                'Model 3': [
                    { name: '1st Generation', years: '2017-Present' }
                ],
                'Model X': [
                    { name: '1st Generation', years: '2015-Present' }
                ],
                'Model Y': [
                    { name: '1st Generation', years: '2019-Present' }
                ],
                'Cybertruck': [
                    { name: '1st Generation', years: '2023-Present' }
                ],
                'Roadster': [
                    { name: '1st Generation', years: '2008-2012' },
                    { name: '2nd Generation', years: 'TBD' }
                ]
            },
            'Ferrari': {
                '488': [
                    { name: 'GTB', years: '2015-2019' },
                    { name: 'Pista', years: '2018-2020' }
                ],
                '458': [
                    { name: 'Italia', years: '2009-2015' },
                    { name: 'Speciale', years: '2013-2015' }
                ],
                'F8': [
                    { name: 'Tributo', years: '2019-Present' }
                ],
                'Portofino': [
                    { name: '1st Generation', years: '2017-Present' }
                ],
                'Roma': [
                    { name: '1st Generation', years: '2019-Present' }
                ],
                'SF90': [
                    { name: 'Stradale', years: '2019-Present' }
                ],
                '812': [
                    { name: 'Superfast', years: '2017-Present' }
                ]
            },
            'Lamborghini': {
                'Huracán': [
                    { name: 'LP 610-4', years: '2014-2019' },
                    { name: 'EVO', years: '2019-Present' }
                ],
                'Aventador': [
                    { name: 'LP 700-4', years: '2011-2016' },
                    { name: 'LP 740-4 S', years: '2016-2021' },
                    { name: 'LP 780-4 Ultimae', years: '2021-2022' }
                ],
                'Urus': [
                    { name: '1st Generation', years: '2017-Present' }
                ],
                'Revuelto': [
                    { name: '1st Generation', years: '2023-Present' }
                ]
            },
            'McLaren': {
                '720S': [
                    { name: 'Coupé', years: '2017-2022' },
                    { name: 'Spider', years: '2018-2022' }
                ],
                'Artura': [
                    { name: '1st Generation', years: '2021-Present' }
                ],
                'GT': [
                    { name: '1st Generation', years: '2019-Present' }
                ],
                '570S': [
                    { name: 'Coupé', years: '2015-2021' },
                    { name: 'Spider', years: '2016-2021' }
                ]
            },
            'Bugatti': {
                'Chiron': [
                    { name: '1st Generation', years: '2016-2022' }
                ],
                'Veyron': [
                    { name: '1st Generation', years: '2005-2015' }
                ],
                'Divo': [
                    { name: '1st Generation', years: '2018-2021' }
                ],
                'Centodieci': [
                    { name: '1st Generation', years: '2019-2020' }
                ],
                'Bolide': [
                    { name: '1st Generation', years: '2020-Present' }
                ]
            }
        };
        
        this.parts = {
            engine: [
                {
                    id: 'cold-air-intake',
                    name: 'Cold Air Intake',
                    icon: '🌬️',
                    price: 299,
                    effects: { hp: 15, torque: 10 },
                    category: 'engine'
                },
                {
                    id: 'performance-chip',
                    name: 'Performance Chip',
                    icon: '💾',
                    price: 499,
                    effects: { hp: 25, torque: 20, topSpeed: 5 },
                    category: 'engine'
                },
                {
                    id: 'turbo-kit',
                    name: 'Turbo Kit',
                    icon: '⚡',
                    price: 3999,
                    effects: { hp: 150, torque: 120, topSpeed: 30 },
                    category: 'engine'
                },
                {
                    id: 'supercharger',
                    name: 'Supercharger',
                    icon: '🌀',
                    price: 5999,
                    effects: { hp: 200, torque: 180, topSpeed: 25 },
                    category: 'engine'
                }
            ],
            suspension: [
                {
                    id: 'lowering-springs',
                    name: 'Lowering Springs',
                    icon: '🔧',
                    price: 299,
                    effects: { height: 'Lowered', camber: 0.5 },
                    requiresSuspension: false,
                    category: 'suspension'
                },
                {
                    id: 'coilovers',
                    name: 'Coilovers',
                    icon: '⚙️',
                    price: 1299,
                    effects: { height: 'Adjustable', camber: 1.5 },
                    requiresSuspension: false,
                    category: 'suspension'
                },
                {
                    id: 'performance-shocks',
                    name: 'Performance Shocks',
                    icon: '🛠️',
                    price: 899,
                    effects: { weight: -20 },
                    requiresSuspension: true,
                    category: 'suspension'
                },
                {
                    id: 'sway-bars',
                    name: 'Sway Bars',
                    icon: '🔗',
                    price: 399,
                    effects: { weight: -15, camber: 0.2 },
                    requiresSuspension: true,
                    category: 'suspension'
                }
            ],
            exhaust: [
                {
                    id: 'cat-back-exhaust',
                    name: 'Cat-Back Exhaust',
                    icon: '💨',
                    price: 799,
                    effects: { hp: 20, torque: 15, weight: -30 },
                    category: 'exhaust'
                },
                {
                    id: 'headers',
                    name: 'Performance Headers',
                    icon: '🔥',
                    price: 1299,
                    effects: { hp: 35, torque: 25, weight: -25 },
                    category: 'exhaust'
                },
                {
                    id: 'full-exhaust',
                    name: 'Full Exhaust System',
                    icon: '🚀',
                    price: 2499,
                    effects: { hp: 50, torque: 40, weight: -50 },
                    category: 'exhaust'
                }
            ],
            wheels: [
                {
                    id: 'lightweight-wheels',
                    name: 'Lightweight Wheels',
                    icon: '⭕',
                    price: 1599,
                    effects: { weight: -40 },
                    category: 'wheels'
                },
                {
                    id: 'performance-tires',
                    name: 'Performance Tires',
                    icon: '🛞',
                    price: 899,
                    effects: { topSpeed: 10 },
                    category: 'wheels'
                },
                {
                    id: 'drag-radials',
                    name: 'Drag Radials',
                    icon: '🏁',
                    price: 1299,
                    effects: { topSpeed: -5, hp: 10 },
                    category: 'wheels'
                }
            ],
            body: [
                {
                    id: 'spoiler',
                    name: 'Rear Spoiler',
                    icon: '🏎️',
                    price: 599,
                    effects: { topSpeed: 5, weight: 15 },
                    category: 'body'
                },
                {
                    id: 'body-kit',
                    name: 'Full Body Kit',
                    icon: '🎨',
                    price: 2999,
                    effects: { weight: 50, topSpeed: -3 },
                    category: 'body'
                },
                {
                    id: 'carbon-fiber-hood',
                    name: 'Carbon Fiber Hood',
                    icon: '🔷',
                    price: 1899,
                    effects: { weight: -30 },
                    category: 'body'
                },
                {
                    id: 'wide-body',
                    name: 'Wide Body Kit',
                    icon: '📐',
                    price: 4999,
                    effects: { weight: 80, topSpeed: -8 },
                    category: 'body'
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.loadParts('engine');
    }
    
    checkAuthStatus() {
        const token = localStorage.getItem('carBuilderToken');
        const user = localStorage.getItem('carBuilderUser');
        
        if (token && user) {
            this.token = token;
            this.currentUser = JSON.parse(user);
            this.showMainApp();
        } else {
            this.showAuthSection();
        }
    }
    
    setupEventListeners() {
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
                document.getElementById(`${tabName}-form`).classList.add('active');
            });
        });
        
        // Auth forms
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
        
        // Main app buttons
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('my-builds-btn').addEventListener('click', () => this.showMyBuilds());
        document.getElementById('gallery-btn').addEventListener('click', () => this.showGallery());
        document.getElementById('save-build-btn').addEventListener('click', () => this.saveBuild());
        document.getElementById('continue-to-build').addEventListener('click', () => this.continueToBuild());
        document.getElementById('car-make').addEventListener('change', () => this.updateModelOptions());
        
        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('show');
            });
        });
        
        // Close modal on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
        
        // File upload
        const fileInput = document.getElementById('file-input');
        const uploadArea = document.getElementById('upload-area');
        
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processFile(files[0]);
            }
        });
        
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.loadParts(tab.dataset.category);
            });
        });
    }
    
    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const response = await fetch(`${this.apiBase}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('carBuilderToken', this.token);
                localStorage.setItem('carBuilderUser', JSON.stringify(this.currentUser));
                this.showMainApp();
                this.showMessage('Login successful!', 'success');
            } else {
                this.showMessage(data.error || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        }
    }
    
    async handleRegister() {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        try {
            const response = await fetch(`${this.apiBase}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                localStorage.setItem('carBuilderToken', this.token);
                localStorage.setItem('carBuilderUser', JSON.stringify(this.currentUser));
                this.showMainApp();
                this.showMessage('Registration successful!', 'success');
            } else {
                this.showMessage(data.error || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        }
    }
    
    handleLogout() {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('carBuilderToken');
        localStorage.removeItem('carBuilderUser');
        this.showAuthSection();
        this.resetBuild();
    }
    
    showAuthSection() {
        document.getElementById('auth-section').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    }
    
    showMainApp() {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('username-display').textContent = this.currentUser.username;
    }
    
    showMessage(message, type) {
        const messageEl = document.getElementById('auth-message');
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
    
    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }
    
    processFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.carImageData = e.target.result;
            this.displayCar(this.carImageData);
            // Show car details form after image upload
            document.getElementById('car-details-form').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    
    updateModelOptions() {
        const makeSelect = document.getElementById('car-make');
        const modelSelect = document.getElementById('car-model');
        const selectedMake = makeSelect.value;
        
        // Clear current options
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        if (!selectedMake || selectedMake === 'Other') {
            // If "Other" is selected or no make selected, show text input
            modelSelect.style.display = 'none';
            // Create a text input for custom model
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.id = 'car-model-text';
            textInput.placeholder = 'Enter model name';
            textInput.required = true;
            textInput.className = 'car-model-text-input';
            
            // Replace select with text input
            modelSelect.parentNode.appendChild(textInput);
        } else {
            // Remove text input if it exists
            const textInput = document.getElementById('car-model-text');
            if (textInput) {
                textInput.remove();
            }
            
            // Show select and populate with models
            modelSelect.style.display = 'block';
            
            const models = this.carGenerations[selectedMake];
            if (models) {
                Object.keys(models).forEach(modelName => {
                    const optionGroup = document.createElement('optgroup');
                    optionGroup.label = modelName;
                    
                    models[modelName].forEach(generation => {
                        const option = document.createElement('option');
                        option.value = `${modelName} - ${generation.name} (${generation.years})`;
                        option.textContent = `${modelName} - ${generation.name} (${generation.years})`;
                        optionGroup.appendChild(option);
                    });
                    
                    modelSelect.appendChild(optionGroup);
                });
            }
        }
    }
    
    continueToBuild() {
        // Get car details from form
        const make = document.getElementById('car-make').value;
        const modelSelect = document.getElementById('car-model');
        const modelText = document.getElementById('car-model-text');
        const year = document.getElementById('car-year').value;
        const color = document.getElementById('car-color').value;
        
        // Get model value from either select or text input
        let model = '';
        if (modelText) {
            model = modelText.value;
        } else {
            model = modelSelect.value;
        }
        
        // Validate all fields
        if (!make || !model || !year || !color) {
            alert('Please fill in all car details');
            return;
        }
        
        // Store car details
        this.carDetails = { make, model, year, color };
        
        // Update display
        this.updateCarDisplay();
        
        // Show car and parts sections
        document.getElementById('upload-section').classList.add('hidden');
        document.getElementById('car-section').classList.remove('hidden');
        document.getElementById('parts-section').classList.remove('hidden');
    }
    
    updateCarDisplay() {
        const carTitle = document.getElementById('car-title');
        const carYearDisplay = document.getElementById('car-year-display');
        const carMakeDisplay = document.getElementById('car-make-display');
        const carModelDisplay = document.getElementById('car-model-display');
        const carColorDisplay = document.getElementById('car-color-display');
        
        // Update car title
        carTitle.textContent = `${this.carDetails.year} ${this.carDetails.make} ${this.carDetails.model}`;
        
        // Update car specs
        carYearDisplay.textContent = this.carDetails.year;
        carMakeDisplay.textContent = this.carDetails.make;
        carModelDisplay.textContent = this.carDetails.model;
        carColorDisplay.textContent = this.carDetails.color;
    }
    
    displayCar(imageSrc) {
        const carImage = document.getElementById('car-image');
        carImage.src = imageSrc;
        // Don't show sections yet - wait for car details
    }
    
    loadParts(category) {
        const partsGrid = document.getElementById('parts-grid');
        partsGrid.innerHTML = '';
        
        this.parts[category].forEach(part => {
            const partCard = this.createPartCard(part);
            partsGrid.appendChild(partCard);
        });
    }
    
    createPartCard(part) {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.dataset.partId = part.id;
        
        // Check if part is already selected
        if (this.selectedParts.find(p => p.id === part.id)) {
            card.classList.add('selected');
        }
        
        // Check if part requires suspension
        if (part.requiresSuspension && !this.hasSuspension) {
            card.style.opacity = '0.5';
            card.style.cursor = 'not-allowed';
        }
        
        card.innerHTML = `
            <div class="part-icon">${part.icon}</div>
            <div class="part-name">${part.name}</div>
            <div class="part-price">$${part.price}</div>
            <div class="part-effects">${this.formatEffects(part.effects)}</div>
        `;
        
        card.addEventListener('click', () => this.togglePart(part));
        
        return card;
    }
    
    formatEffects(effects) {
        const effectStrings = [];
        
        Object.entries(effects).forEach(([stat, value]) => {
            if (stat === 'height') {
                effectStrings.push(`Height: ${value}`);
            } else if (stat === 'camber') {
                effectStrings.push(`Camber: +${value}°`);
            } else if (typeof value === 'number') {
                const sign = value > 0 ? '+' : '';
                effectStrings.push(`${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${sign}${value}`);
            }
        });
        
        return effectStrings.join(', ');
    }
    
    togglePart(part) {
        // Check if part requires suspension
        if (part.requiresSuspension && !this.hasSuspension) {
            alert('This part requires suspension upgrades first!');
            return;
        }
        
        const existingIndex = this.selectedParts.findIndex(p => p.id === part.id);
        
        if (existingIndex > -1) {
            // Remove part
            this.selectedParts.splice(existingIndex, 1);
            document.querySelector(`[data-part-id="${part.id}"]`).classList.remove('selected');
        } else {
            // Add part
            this.selectedParts.push(part);
            document.querySelector(`[data-part-id="${part.id}"]`).classList.add('selected');
            
            // Check if this is a suspension part
            if (part.category === 'suspension' && !part.requiresSuspension) {
                this.hasSuspension = true;
                // Refresh parts to enable suspension-dependent parts
                const activeCategory = document.querySelector('.category-tab.active').dataset.category;
                this.loadParts(activeCategory);
            }
        }
        
        this.updateStats();
        this.updateSelectedPartsList();
    }
    
    updateStats() {
        // Reset to base stats
        this.currentStats = { ...this.baseStats };
        
        // Apply all selected parts
        this.selectedParts.forEach(part => {
            Object.entries(part.effects).forEach(([stat, value]) => {
                if (typeof this.currentStats[stat] === 'number') {
                    this.currentStats[stat] += value;
                } else {
                    this.currentStats[stat] = value;
                }
            });
        });
        
        // Update UI
        this.updateStatDisplay();
    }
    
    updateStatDisplay() {
        const statElements = {
            hp: document.getElementById('stat-hp'),
            torque: document.getElementById('stat-torque'),
            weight: document.getElementById('stat-weight'),
            camber: document.getElementById('stat-camber'),
            height: document.getElementById('stat-height'),
            topSpeed: document.getElementById('stat-speed')
        };
        
        Object.entries(statElements).forEach(([stat, element]) => {
            const baseValue = this.baseStats[stat];
            const currentValue = this.currentStats[stat];
            
            if (typeof currentValue === 'number') {
                element.textContent = this.formatStatValue(stat, currentValue);
                
                // Add modified class if changed
                const parent = element.closest('.stat-item');
                if (currentValue !== baseValue) {
                    parent.classList.add('modified');
                } else {
                    parent.classList.remove('modified');
                }
            } else {
                element.textContent = currentValue;
                const parent = element.closest('.stat-item');
                if (currentValue !== baseValue) {
                    parent.classList.add('modified');
                } else {
                    parent.classList.remove('modified');
                }
            }
        });
    }
    
    formatStatValue(stat, value) {
        switch(stat) {
            case 'hp':
                return `${value} HP`;
            case 'torque':
                return `${value} lb-ft`;
            case 'weight':
                return `${value} lbs`;
            case 'camber':
                return `${value}°`;
            case 'topSpeed':
                return `${value} mph`;
            default:
                return value;
        }
    }
    
    updateSelectedPartsList() {
        const listContainer = document.getElementById('selected-parts-list');
        const totalCostElement = document.getElementById('total-cost');
        
        if (this.selectedParts.length === 0) {
            listContainer.innerHTML = '<p class="no-parts">No parts selected yet</p>';
            totalCostElement.textContent = '0';
            return;
        }
        
        listContainer.innerHTML = '';
        let totalCost = 0;
        
        this.selectedParts.forEach(part => {
            const partItem = document.createElement('div');
            partItem.className = 'selected-part-item';
            partItem.innerHTML = `
                <span>${part.icon} ${part.name}</span>
                <span>$${part.price}</span>
                <button onclick="carBuilder.removePart('${part.id}')">Remove</button>
            `;
            listContainer.appendChild(partItem);
            totalCost += part.price;
        });
        
        totalCostElement.textContent = totalCost;
    }
    
    removePart(partId) {
        const partIndex = this.selectedParts.findIndex(p => p.id === partId);
        if (partIndex > -1) {
            const part = this.selectedParts[partIndex];
            this.selectedParts.splice(partIndex, 1);
            document.querySelector(`[data-part-id="${partId}"]`).classList.remove('selected');
            
            // Check if we removed the last suspension part
            if (part.category === 'suspension' && !part.requiresSuspension) {
                const remainingSuspension = this.selectedParts.find(p => 
                    p.category === 'suspension' && !p.requiresSuspension
                );
                this.hasSuspension = !!remainingSuspension;
                
                // Refresh parts if suspension status changed
                const activeCategory = document.querySelector('.category-tab.active').dataset.category;
                this.loadParts(activeCategory);
            }
            
            this.updateStats();
            this.updateSelectedPartsList();
        }
    }
    
    async saveBuild() {
        if (!this.carImageData) {
            alert('Please upload a car image first!');
            return;
        }
        
        if (!this.carDetails.make || !this.carDetails.model || !this.carDetails.year || !this.carDetails.color) {
            alert('Please complete car details first!');
            return;
        }
        
        const buildName = document.getElementById('build-name').value.trim();
        if (!buildName) {
            alert('Please enter a build name!');
            return;
        }
        
        const totalCost = this.selectedParts.reduce((sum, part) => sum + part.price, 0);
        
        try {
            const response = await fetch(`${this.apiBase}/save-build`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    name: buildName,
                    carImage: this.carImageData,
                    carDetails: this.carDetails,
                    selectedParts: this.selectedParts,
                    totalCost,
                    finalStats: this.currentStats
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Build saved successfully!');
                document.getElementById('build-name').value = '';
            } else {
                alert(data.error || 'Failed to save build');
            }
        } catch (error) {
            console.error('Save build error:', error);
            alert('Network error. Please try again.');
        }
    }
    
    async showMyBuilds() {
        try {
            const response = await fetch(`${this.apiBase}/my-builds`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.displayBuilds(data.builds, 'my-builds-list', true);
                document.getElementById('my-builds-modal').classList.add('show');
            } else {
                alert(data.error || 'Failed to load builds');
            }
        } catch (error) {
            console.error('Load builds error:', error);
            alert('Network error. Please try again.');
        }
    }
    
    async showGallery() {
        try {
            const response = await fetch(`${this.apiBase}/public-builds`);
            const data = await response.json();
            
            if (response.ok) {
                this.displayBuilds(data.builds, 'gallery-list', false);
                document.getElementById('gallery-modal').classList.add('show');
            } else {
                alert(data.error || 'Failed to load gallery');
            }
        } catch (error) {
            console.error('Load gallery error:', error);
            alert('Network error. Please try again.');
        }
    }
    
    displayBuilds(builds, containerId, canDelete) {
        const container = document.getElementById(containerId);
        
        if (builds.length === 0) {
            container.innerHTML = '<p class="no-builds">No builds found</p>';
            return;
        }
        
        container.innerHTML = '';
        
        builds.forEach(build => {
            const buildCard = document.createElement('div');
            buildCard.className = 'build-card';
            
            const createdDate = new Date(build.createdAt).toLocaleDateString();
            const statsText = `${build.finalStats.hp}HP | ${build.finalStats.topSpeed}mph`;
            const carInfo = build.carDetails ? 
                `${build.carDetails.year} ${build.carDetails.make} ${build.carDetails.model}` : 
                'Unknown Car';
            
            buildCard.innerHTML = `
                <img src="${build.carImage}" alt="${build.name}" class="build-image">
                <div class="build-info">
                    <div class="build-name">${build.name}</div>
                    <div class="build-car-info">${carInfo}</div>
                    <div class="build-details">
                        <span class="build-stats">${statsText}</span>
                        <span class="build-cost">$${build.totalCost}</span>
                    </div>
                    ${build.username ? `<div class="build-author">by ${build.username}</div>` : ''}
                    <div class="build-date">${createdDate}</div>
                    ${canDelete ? `<button class="delete-build-btn" onclick="carBuilder.deleteBuild('${build._id}')">Delete Build</button>` : ''}
                </div>
            `;
            
            container.appendChild(buildCard);
        });
    }
    
    async deleteBuild(buildId) {
        if (!confirm('Are you sure you want to delete this build?')) {
            return;
        }
        
        try {
            const response = await fetch(`${this.apiBase}/build/${buildId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Build deleted successfully!');
                this.showMyBuilds(); // Refresh the list
            } else {
                alert(data.error || 'Failed to delete build');
            }
        } catch (error) {
            console.error('Delete build error:', error);
            alert('Network error. Please try again.');
        }
    }
    
    resetBuild() {
        this.selectedParts = [];
        this.hasSuspension = false;
        this.carImageData = null;
        this.carDetails = {
            make: '',
            model: '',
            year: '',
            color: ''
        };
        this.currentStats = { ...this.baseStats };
        
        // Reset UI
        document.getElementById('upload-section').classList.remove('hidden');
        document.getElementById('car-section').classList.add('hidden');
        document.getElementById('parts-section').classList.add('hidden');
        document.getElementById('car-details-form').style.display = 'none';
        document.getElementById('build-name').value = '';
        
        // Clear file input
        document.getElementById('file-input').value = '';
        
        // Clear car details form
        document.getElementById('car-make').value = '';
        document.getElementById('car-model').innerHTML = '<option value="">Select Make First</option>';
        document.getElementById('car-year').value = '';
        document.getElementById('car-color').value = '';
        
        // Remove custom model text input if it exists
        const textInput = document.getElementById('car-model-text');
        if (textInput) {
            textInput.remove();
        }
        
        // Reset parts display
        this.updateStats();
        this.updateSelectedPartsList();
        
        // Refresh parts to remove selection
        const activeCategory = document.querySelector('.category-tab.active').dataset.category;
        this.loadParts(activeCategory);
    }
}

// Initialize the application
const carBuilder = new CarBuilder();
