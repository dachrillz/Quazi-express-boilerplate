root = 'config'

import os

for dir, subdirs, files in os.walk(f"./{root}"):
    for f in files:
        if f.endswith("_sk"):
            os.rename(f"{dir}/{f}", f"{dir}/key.pem")
