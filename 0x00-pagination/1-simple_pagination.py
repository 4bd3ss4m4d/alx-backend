#!/usr/bin/env python3
'''
This module contains the class Server
'''
import csv
import math
from typing import List, Tuple


class Server:
    '''
    Server class to paginate a dataset
    Attributes:
        DATA_FILE: str

    Methods:
        dataset(self) -> List[List]
        get_page(self, page: int = 1, page_size: int = 10) -> List[List]
        index_range(self, page: int, page_size: int) -> Tuple[int, int]
    '''

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        '''
        Constructor of the Server class
        '''
        self.__dataset = None

    def dataset(self) -> List[List]:
        '''
        Loads the dataset from a file and returns it
        Return:
            List[List]
        '''
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        Returns the appropriate page of the dataset
        Parameters:
            page: int
            page_size: int
        Return:
            List[List]
        '''
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        start, end = self.index_range(page, page_size)
        return self.dataset()[start:end]

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        '''
        Returns a tuple containing the start and end indexes of the page
        Parameters:
            page: int
            page_size: int
        Return:
            Tuple[int, int]
        '''
        start_page = (page - 1) * page_size
        end_page = page * page_size
        return (start_page, end_page)
