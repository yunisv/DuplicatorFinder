import os
from concurrent.futures import ThreadPoolExecutor


def process_directory(path):
    tree = {'title': os.path.basename(path), 'key': path, 'children': []}
    if os.path.isdir(path):
        with ThreadPoolExecutor() as executor:
            futures = []
            for filename in os.listdir(path):
                child_path = os.path.join(path, filename)
                if os.path.isdir(child_path):
                    futures.append(executor.submit(process_directory, child_path))
            for future in futures:
                child = future.result()
                tree['children'].append(child)
    else:
        tree['isLeaf'] = True
    return tree
