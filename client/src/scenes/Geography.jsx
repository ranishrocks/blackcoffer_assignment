import Header from "@/components/Header";
import { useGetDataQuery } from "@/state/api"; // Fetch MongoDB data with country field
import { geoData } from "@/state/geoData"; // GeoJSON data for the world map
import { Box, useTheme, CircularProgress } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";

const countryNameToISO = {
  "Afghanistan": "AFG",
  "Albania": "ALB",
  "Algeria": "DZA",
  "Andorra": "AND",
  "Angola": "AGO",
  "Antigua and Barbuda": "ATG",
  "Argentina": "ARG",
  "Armenia": "ARM",
  "Australia": "AUS",
  "Austria": "AUT",
  "Azerbaijan": "AZE",
  "Bahamas": "BHS",
  "Bahrain": "BHR",
  "Bangladesh": "BGD",
  "Barbados": "BRB",
  "Belarus": "BLR",
  "Belgium": "BEL",
  "Belize": "BLZ",
  "Benin": "BEN",
  "Bhutan": "BTN",
  "Bolivia": "BOL",
  "Bosnia and Herzegovina": "BIH",
  "Botswana": "BWA",
  "Brazil": "BRA",
  "Brunei": "BRN",
  "Bulgaria": "BGR",
  "Burkina Faso": "BFA",
  "Burundi": "BDI",
  "Cabo Verde": "CPV",
  "Cambodia": "KHM",
  "Cameroon": "CMR",
  "Canada": "CAN",
  "Central African Republic": "CAF",
  "Chad": "TCD",
  "Chile": "CHL",
  "China": "CHN",
  "Colombia": "COL",
  "Comoros": "COM",
  "Congo, Democratic Republic of the": "COD",
  "Congo, Republic of the": "COG",
  "Costa Rica": "CRI",
  "Croatia": "HRV",
  "Cuba": "CUB",
  "Cyprus": "CYP",
  "Czech Republic": "CZE",
  "Denmark": "DNK",
  "Djibouti": "DJI",
  "Dominica": "DMA",
  "Dominican Republic": "DOM",
  "Ecuador": "ECU",
  "Egypt": "EGY",
  "El Salvador": "SLV",
  "Equatorial Guinea": "GNQ",
  "Eritrea": "ERI",
  "Estonia": "EST",
  "Eswatini": "SWZ",
  "Ethiopia": "ETH",
  "Fiji": "FJI",
  "Finland": "FIN",
  "France": "FRA",
  "Gabon": "GAB",
  "Gambia": "GMB",
  "Georgia": "GEO",
  "Germany": "DEU",
  "Ghana": "GHA",
  "Greece": "GRC",
  "Grenada": "GRD",
  "Guatemala": "GTM",
  "Guinea": "GIN",
  "Guinea-Bissau": "GNB",
  "Guyana": "GUY",
  "Haiti": "HTI",
  "Honduras": "HND",
  "Hungary": "HUN",
  "Iceland": "ISL",
  "India": "IND",
  "Indonesia": "IDN",
  "Iran": "IRN",
  "Iraq": "IRQ",
  "Ireland": "IRL",
  "Israel": "ISR",
  "Italy": "ITA",
  "Jamaica": "JAM",
  "Japan": "JPN",
  "Jordan": "JOR",
  "Kazakhstan": "KAZ",
  "Kenya": "KEN",
  "Kiribati": "KIR",
  "Korea, North": "PRK",
  "Korea, South": "KOR",
  "Kuwait": "KWT",
  "Kyrgyzstan": "KGZ",
  "Laos": "LAO",
  "Latvia": "LVA",
  "Lebanon": "LBN",
  "Lesotho": "LSO",
  "Liberia": "LBR",
  "Libya": "LBY",
  "Liechtenstein": "LIE",
  "Lithuania": "LTU",
  "Luxembourg": "LUX",
  "Madagascar": "MDG",
  "Malawi": "MWI",
  "Malaysia": "MYS",
  "Maldives": "MDV",
  "Mali": "MLI",
  "Malta": "MLT",
  "Marshall Islands": "MHL",
  "Mauritania": "MRT",
  "Mauritius": "MUS",
  "Mexico": "MEX",
  "Micronesia": "FSM",
  "Moldova": "MDA",
  "Monaco": "MCO",
  "Mongolia": "MNG",
  "Montenegro": "MNE",
  "Morocco": "MAR",
  "Mozambique": "MOZ",
  "Myanmar": "MMR",
  "Namibia": "NAM",
  "Nauru": "NRU",
  "Nepal": "NPL",
  "Netherlands": "NLD",
  "New Zealand": "NZL",
  "Nicaragua": "NIC",
  "Niger": "NER",
  "Nigeria": "NGA",
  "North Macedonia": "MKD",
  "Norway": "NOR",
  "Oman": "OMN",
  "Pakistan": "PAK",
  "Palau": "PLW",
  "Palestine": "PSE",
  "Panama": "PAN",
  "Papua New Guinea": "PNG",
  "Paraguay": "PRY",
  "Peru": "PER",
  "Philippines": "PHL",
  "Poland": "POL",
  "Portugal": "PRT",
  "Qatar": "QAT",
  "Romania": "ROU",
  "Russia": "RUS",
  "Rwanda": "RWA",
  "Saint Kitts and Nevis": "KNA",
  "Saint Lucia": "LCA",
  "Saint Vincent and the Grenadines": "VCT",
  "Samoa": "WSM",
  "San Marino": "SMR",
  "Sao Tome and Principe": "STP",
  "Saudi Arabia": "SAU",
  "Senegal": "SEN",
  "Serbia": "SRB",
  "Seychelles": "SYC",
  "Sierra Leone": "SLE",
  "Singapore": "SGP",
  "Slovakia": "SVK",
  "Slovenia": "SVN",
  "Solomon Islands": "SLB",
  "Somalia": "SOM",
  "South Africa": "ZAF",
  "South Sudan": "SSD",
  "Spain": "ESP",
  "Sri Lanka": "LKA",
  "Sudan": "SDN",
  "Suriname": "SUR",
  "Sweden": "SWE",
  "Switzerland": "CHE",
  "Syria": "SYR",
  "Taiwan": "TWN",
  "Tajikistan": "TJK",
  "Tanzania": "TZA",
  "Thailand": "THA",
  "Timor-Leste": "TLS",
  "Togo": "TGO",
  "Tonga": "TON",
  "Trinidad and Tobago": "TTO",
  "Tunisia": "TUN",
  "Turkey": "TUR",
  "Turkmenistan": "TKM",
  "Tuvalu": "TUV",
  "Uganda": "UGA",
  "Ukraine": "UKR",
  "United Arab Emirates": "ARE",
  "United Kingdom": "GBR",
  "United States of America": "USA",
  "Uruguay": "URY",
  "Uzbekistan": "UZB",
  "Vanuatu": "VUT",
  "Vatican City": "VAT",
  "Venezuela": "VEN",
  "Vietnam": "VNM",
  "Yemen": "YEM",
  "Zambia": "ZMB",
  "Zimbabwe": "ZWE",
};

function Geography() {
  const theme = useTheme();
  const { data, isLoading } = useGetDataQuery(); // Fetch MongoDB data

  // Transform MongoDB data into a format suitable for the choropleth map
  const transformDataToMapFormat = (data) => {
    const countryCounts = data.reduce((acc, item) => {
      if (item.country && countryNameToISO[item.country]) {
        const isoCode = countryNameToISO[item.country];
        acc[isoCode] = (acc[isoCode] || 0) + 1; // Increment count for the country
      }
      return acc;
    }, {});

    return Object.keys(countryCounts).map((isoCode) => ({
      id: isoCode,
      value: countryCounts[isoCode], // Total occurrences of each country
    }));
  };

  // Transform the data if available
  const mapData = data ? transformDataToMapFormat(data) : [];

  // Show a loading spinner while the data is loading
  if (isLoading || !data) {
    return (
      <Box
        width="100%"
        height="100%"
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // Determine the maximum value for scaling purposes
  const maxValue = Math.max(...mapData.map((d) => d.value), 1); // Avoid division by zero

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="72vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {mapData.length > 0 ? (
          <ResponsiveChoropleth
            data={mapData} // Transformed MongoDB data
            colors="nivo" // You can customize this to a different color scheme if needed
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.grey[700],
                },
              },
            }}
            features={geoData.features} // GeoJSON features
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, maxValue]} // Use the max value from the dataset
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>No Data Available</>
        )}
      </Box>
    </Box>
  );
}

export default Geography;
