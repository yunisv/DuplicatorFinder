import os


def delete_files(files):
    for i in files:
        # Удаление одного файла
        file_path = i
        os.remove(file_path)
