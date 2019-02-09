import pandas as pd

budgetFilename = 'Talousarvio-fi.csv'

columnnames = ['Vuosi', 'Paaluokka/Osasto', 'Luku', 'Momentti', 'Alkup.talousarvio', 'Lisätalousarvio',	'Voimassaoleva talousarvio', 'Käytettävissä', 'Nettokertymä ko.vuodelta', 'Nettokertymä','Jäljellä']

rawdata = pd.read_csv(budgetFilename, delimiter='\t', names=columnnames)
print(rawdata)