import pandas as pd


budgetFilename = 'Talousarvio-modified.csv'
columnnames = ['Vuosi', 'Paaluokka', 'Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio', 'Voimassaoleva talousarvio', 'Kaytettavissa', 'Nettokertyma vuodelta', 'Nettokertyma','Jaljella']

# Place label names to variables for easier usage
yearLabel = 'Vuosi'
categoryLabel = 'Paaluokka/Osasto'
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
#print(rawdata)

todrop = ['Luku', 'Alkup.talousarvio', 'Lisatalousarvio', 'Kaytettavissa', 'Nettokertyma', 'Nettokertyma vuodelta', 'Jaljella']
wantedData = rawdata.drop(labels=todrop, axis=1)
print(wantedData)

print(list(rawdata.columns.values))

