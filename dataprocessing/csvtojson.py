import pandas as pd


budgetFilename = 'Talousarvio-modified.csv'
columnnames = ['Vuosi', 'Paaluokka', 'Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio', 'Voimassaoleva talousarvio', 'Kaytettavissa', 'Nettokertyma vuodelta', 'Nettokertyma','Jaljella']

# Place label names to variables for easier usage
yearLabel = 'Vuosi'
categoryLabel = 'Paaluokka'
subcategoryLabel = 'Momentti'
budgetLabel = 'Voimassaoleva talousarvio'

# INPUT: Important datafields:
# Vuosi
# Paaluokka/Osasto
# Momentti (subcategory)
# Voimassaoleva talousarvio

# ================================================================================

# Import the data
rawdata = pd.read_csv(budgetFilename, sep='\t', names=columnnames, index_col=False)

# Drop unimportant columns
todrop = ['Luku', 'Alkup.talousarvio', 'Lisatalousarvio', 'Kaytettavissa', 'Nettokertyma', 'Nettokertyma vuodelta', 'Jaljella']
filteredData = rawdata.drop(labels=todrop, axis=1)

# Clean the numbers from the beginning of the category and subcategory columns
filteredData[categoryLabel] = filteredData[categoryLabel].map(lambda x: x.lstrip('0123456789.')) 
filteredData[subcategoryLabel] = filteredData[subcategoryLabel].map(lambda x: x.lstrip('0123456789.'))
print(filteredData[categoryLabel].)

# Convert to JSON