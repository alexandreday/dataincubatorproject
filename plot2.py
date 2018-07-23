import numpy as np
from matplotlib import pyplot as plt
import json,pickle
import pandas as pd

housing_data = json.load(open("housing_data.json",'r'))
charging_data = json.load(open("chargingstation_data.json",'r'))

df_c = pd.DataFrame(charging_data)
df_h = pd.DataFrame(housing_data)

n_charging_station=len(df_c)

count_r_all = []

radius = 0.01
count_vs_price = []
""" print(df_h['price'].values)
idx = np.where(df_h['price'].values < 500)[0]
print(idx)
print(min(df_h['price']/df_h['sqft']))
exit() """

x = df_c['lat'].values
y = df_c['lon'].values
xy = np.vstack((x,y)).T

for price in np.arange(0.25,6.0,0.1):
    s = (df_h['price']/df_h['sqft']).values
    idx = np.where(s < price)[0]
    df_h_sub = df_h.iloc[idx]
    count = 0
    for j in range(len(df_h_sub)):
        lat = df_h_sub['lat'].iloc[j]
        lon = df_h_sub['lon'].iloc[j]
        xy_current = np.array([lat,lon])

        dist = np.linalg.norm(xy - xy_current, axis=1)
        count+= np.count_nonzero(dist < radius)

    count_vs_price.append(count/len(df_h_sub))

pickle.dump(count_vs_price, open('count_vs_price.pkl','wb'))
count_vs_price = pickle.load(open('count_vs_price.pkl','rb'))
plt.scatter(np.arange(0.25,6.0,0.1),count_vs_price)
plt.xlabel('Cost of property (\$/square foot)')
plt.ylabel('Number of stations within a distance of 1 mile')
#plt.show()
plt.tight_layout()
plt.savefig('correlation.png')

exit()


for i in range(n_charging_station):
    print(i)
    lat = df_c['lat'].iloc[i]
    lon = df_c['lon'].iloc[i]

    xy_current = np.array([lat,lon])
    x = df_h['lat'].values
    y = df_h['lon'].values
    xy = np.vstack((x,y)).T
    dist = np.linalg.norm(xy - xy_current, axis=1)
    idx_near = np.where(dist < 0.25)
    df_h.iloc[idx_near]['price']

    count_r = []
    for r in np.linspace(0.0001,0.2,200):
        x = df_h['lat'].values
        y = df_h['lon'].values
        xy = np.vstack((x,y)).T
        dist = np.linalg.norm(xy - xy_current, axis=1)
        
        count_r.append(np.count_nonzero(dist < r))
    count_r_all.append(count_r)

pickle.dump(count_r_all,open('count_r_all.pkl','wb'))

count_r_all=pickle.load(open('count_r_all.pkl','rb'))

plt.scatter(range(200),np.mean(np.array(count_r_all),axis=0))
plt.xlabel("Distance from charging station")
plt.xlabel("Number of ")

plt.show()