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
#print(filteredData[categoryLabel].)

#filteredData.set_index([yearLabel, categoryLabel], inplace=True)

'''
with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(filteredData)
filteredData[budgetLabel] = pd.to_numeric(filteredData[budgetLabel])
'''

#filteredData['Sum'] = filteredData.groupby([yearLabel, categoryLabel])[budgetLabel].sum()

# Sum subcategory budgets in each category
categoryBudgets = filteredData.groupby([yearLabel, categoryLabel])[budgetLabel].sum()
print(type(categoryBudgets))

# print('Number of categories ', len(filteredData[categoryLabel].unique()))
# print('Number of category budgets: ', len(categoryBudgets))

# Sum budgets per year to get entire yearly budget
#yearlyBudgets = filteredData.groupby([yearLabel])[budgetLabel].sum()

#print(yearlyBudgets)
#print(categoryBudgets)

#categoryBudgets['Percentage'] = categoryBudgets.groupby([yearLabel])[]

'''
for budget in yearlyBudgets:
    filteredData['Percentage'] = filteredData.groupby([ categoryLabel])['Sum'].apply(lambda x: x / budget)
'''

#print(filteredData)

# Convert to JSON
# [{"percentage":15, "sum" : 100, "name":"Test"},{"percentage":25, "sum" : 200, "name":"Test2"}];

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
        
        categorysum = filteredData.loc[(filteredData[yearLabel] == year) & (filteredData[categoryLabel] == category)][budgetLabel].sum()
        cat_dict['sum'] = categorysum # Category sum
        
        cat_dict['percentage'] = categorysum / yearsum
        categorylist.append(cat_dict) # Category percentage of the year's budget

        subcatlist = []

        # Get subcategories
        '''
        subcategories = 

        for subcategory in subcategories:
            subcat_dict = {}

            subcatlist.append(subcat_dict)
            
        category['subcategories'] = subcatlist
        '''

    year_dict['categories'] = categorylist
    yearlist.append(year_dict)

    json_dict["yearlist"] = yearlist


def default(o):
    if isinstance(o, np.int64): return int(o)  
    raise TypeError

with open("data.json", "w", encoding='utf8') as outfile:
    json.dump(json_dict, outfile, indent=4, sort_keys=True, default=default)

'''
jsondata = (filteredData.groupby([yearLabel], as_index=False))\
    .apply(lambda x: x[[(yearLabel, categoryLabel), 'Sum']]).to_dict()\
    .reset_index()\
    .to_json()

print(jsondata)

'''
'''
jsondata = (filteredData.groupby([yearLabel, categoryLabel], as_index=False)\
    .apply(lambda x: x[[subcategoryLabel, budgetLabel]].to_dict())\
    .reset_index()\
    .rename(columns={0: 'Category'})\
    .to_json(orient='records'))

print(jsondata)
'''

# Print unique categories
'''
with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(filteredData[categoryLabel].unique())

with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    print(filteredData[subcategoryLabel].unique())
'''