# import hashlib
# import os
# import sys
#
#
# def find_duplicate_files(path_to_folder):
#     hash_ls = {}
#     duplicate_count = 0
#     total_files = 0
#
#     for root, folders, files in os.walk(path_to_folder):
#         for filename in files:
#             path_to_file = os.path.join(root, filename)
#
#             file_hash = calc_hash(path_to_file)
#
#             if file_hash in hash_ls:
#                 hash_ls[file_hash].append(path_to_file)
#                 duplicate_count += 1
#             else:
#                 hash_ls[file_hash] = [path_to_file]
#
#             total_files += 1
#
#     # print(duplicate_count)
#     duplicate_percentage = round(duplicate_count / total_files * 100, 2)
#     result = {"list_of_files": {hash: files for hash, files in hash_ls.items() if len(files) > 1},
#               "duplicate_count": duplicate_count, "total_files": total_files,
#               "duplicate_percentage": duplicate_percentage}
#     print(result)
#     return result
#
#
# def calc_hash(path_to_file):
#     # with open(path_to_file, "rb") as f:
#     #     digest = hashlib.file_digest(f, "sha256")
#
#     # return digest.hexdigest()
#
#     sha256_hash = hashlib.sha256()
#     with open(path_to_file, "rb") as file:
#         for chunk in iter(lambda: file.read(4096), b""):
#             sha256_hash.update(chunk)
#     return sha256_hash.hexdigest()
#
#
# def get_duplicate_list(directory_to_scan):
#     if not os.path.isdir(directory_to_scan):
#         print(f"There is not such dir: {directory_to_scan}")
#         sys.exit(1)
#
#     duplicates = find_duplicate_files(directory_to_scan)
#     # print(duplicates)
#
#     return duplicates
#

import hashlib
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor

'''
`ThreadPoolExecutor()` создает пул потоков (thread pool executor) для выполнения задач в фоновых потоках. 

Контекстный менеджер `with ThreadPoolExecutor() as executor` обеспечивает автоматическое управление ресурсами пула потоков. Когда блок `with` завершается, контекстный менеджер автоматически завершает работу пула потоков, ожидая завершения всех задач.

В коде, который я предоставил, мы используем `ThreadPoolExecutor()` для создания пула потоков и называем его `executor`. Затем мы используем метод `map()` пула потоков `executor.map(process_file, file_paths)`, чтобы запустить функцию `process_file` параллельно для каждого пути к файлу из `file_paths`.

`executor.map()` принимает функцию, которую нужно выполнить (`process_file`) и итерируемый объект (`file_paths`), содержащий аргументы для каждого вызова функции. Он автоматически распределяет вызовы функции между потоками в пуле потоков, обрабатывая задачи параллельно.

Пул потоков позволяет выполнять задачи параллельно в нескольких потоках, что может улучшить производительность и сократить время выполнения программы, особенно при задачах, которые не являются CPU-интенсивными и вместо этого ожидают ввода-вывода (например, чтение файлов).
'''


def find_duplicate_files(path_to_folder):
    hash_ls = {}
    duplicate_count = 0
    total_files = 0

    def process_file(path_to_file):
        nonlocal duplicate_count, total_files
        file_hash = calc_hash(path_to_file)
        if file_hash in hash_ls:
            hash_ls[file_hash].append(path_to_file)
            duplicate_count += 1
        else:
            hash_ls[file_hash] = [path_to_file]
        total_files += 1

    with ThreadPoolExecutor() as executor:
        for root, folders, files in os.walk(path_to_folder):
            file_paths = [os.path.join(root, filename) for filename in files]
            executor.map(process_file, file_paths)

    duplicate_percentage = round(duplicate_count / total_files * 100, 2)
    result = {
        "list_of_files": {hash: files for hash, files in hash_ls.items() if len(files) > 1},
        "duplicate_count": duplicate_count,
        "total_files": total_files,
        "duplicate_percentage": duplicate_percentage
    }
    print(result)
    return result


def calc_hash(path_to_file):
    sha256_hash = hashlib.sha256()
    with open(path_to_file, "rb") as file:
        for chunk in iter(lambda: file.read(4096), b""):
            sha256_hash.update(chunk)
    return sha256_hash.hexdigest()


def get_duplicate_list(directory_to_scan):
    start_time = time.time()

    if not os.path.isdir(directory_to_scan):
        print(f"There is no such directory: {directory_to_scan}")
        sys.exit(1)

    duplicates = find_duplicate_files(directory_to_scan)

    end_time = time.time()
    duration = end_time - start_time
    duplicates["duration"] = duration

    return duplicates

# # Вызов функции с нужной директорией для сканирования
# a = input("")
# get_duplicate_list(a)
