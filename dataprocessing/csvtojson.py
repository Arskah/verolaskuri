import pandas as pd
import json
import numpy as np

budgetFilename = 'Talousarvio-modified.csv'
#columnnames = ['Vuosi', 'Paaluokka', 'Osasto', 'Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio', 'Voimassaoleva talousarvio', 'Kaytettavissa', 'Nettokertyma vuodelta', 'Nettokertyma','Jaljella', 'Pois']
columnnames = ['Vuosi', 'Paaluokka', 'Osasto', 'Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio', 'Voimassaoleva talousarvio']

# Place label names to variables for easier usage
yearLabel = 'Vuosi'
categoryLabel = 'Paaluokka'
subcategoryLabel = 'Osasto'
budgetLabel = 'Voimassaoleva talousarvio'

# INPUT: Important datafields:
# Vuosi
# Paaluokka/Osasto
# Momentti (subcategory)
# Voimassaoleva talousarvio

# ================================================================================

# Import the data
rawdata = pd.read_csv(budgetFilename, sep='\t', header=0, names=columnnames, index_col=False, usecols=[0, 1, 2, 3, 4, 5, 6, 7], encoding= 'utf-8')

# Drop unimportant columns
#todrop = ['Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio', 'Kaytettavissa', 'Nettokertyma', 'Nettokertyma vuodelta', 'Jaljella', 'Pois']
todrop = ['Luku', 'Momentti', 'Alkup.talousarvio', 'Lisatalousarvio',]
filteredData = rawdata.drop(labels=todrop, axis=1)

# Clean the numbers from the beginning of the category and subcategory columns
filteredData[categoryLabel] = filteredData[categoryLabel].map(lambda x: x.lstrip('0123456789.')) 
filteredData[subcategoryLabel] = filteredData[subcategoryLabel].map(lambda x: x.lstrip('0123456789.'))

categories = filteredData[categoryLabel].unique().tolist()

json_dict = {}
yearlist = []

for year in filteredData[yearLabel].unique():
    print('Year:', year)
    year_dict = {}
    year_dict['year'] = year
    yearsum = filteredData.loc[(filteredData[yearLabel] == year)][budgetLabel].sum()
    categorylist = []

    for category in categories:
        cat_dict = {}
        cat_dict['name'] = category # Name
        
        categorySum = filteredData.loc[(filteredData[yearLabel] == year) & (filteredData[categoryLabel] == category)][budgetLabel].sum()
        cat_dict['sum'] = categorySum # Category sum
        
        cat_dict['percentage'] = categorySum / yearsum
        categorylist.append(cat_dict) # Category percentage of the year's budget

        subcatlist = []

        # Get subcategories
        
        subcategories = filteredData.loc[(filteredData[yearLabel] == year) & (filteredData[categoryLabel] == category)][subcategoryLabel].unique().tolist()
        
        for subcategory in subcategories:
            subcat_dict = {}
            subcat_dict['name'] = subcategory

            subcategorySum = filteredData.loc[(filteredData[yearLabel] == year)\
                & (filteredData[categoryLabel] == category)\
                & (filteredData[subcategoryLabel] == subcategory)][budgetLabel].sum()

            subcat_dict['sum'] = subcategorySum
            subcat_dict['percentage'] = subcategorySum / categorySum
            subcatlist.append(subcat_dict)
            
        cat_dict['subcategories'] = subcatlist

    year_dict['categories'] = categorylist
    yearlist.append(year_dict)

    json_dict["yearlist"] = yearlist


def default(o):
    if isinstance(o, np.int64): return int(o)  
    if isinstance(o, np.int32): return int(o)
    raise TypeError

with open("data.json", "w", encoding='utf8') as outfile:
    json.dump(json_dict, outfile, indent=4, sort_keys=True, default=default)
    #json.dump(json_dict, outfile, indent=4, sort_keys=True)


# ===========================================================================

# Print unique categories
'''
with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(filteredData[categoryLabel].unique())

with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(filteredData[subcategoryLabel].unique())
'''