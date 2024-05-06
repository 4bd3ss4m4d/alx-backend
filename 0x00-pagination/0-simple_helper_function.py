#!/usr/bin/env python3
'''
This module contains the function index_range
'''
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
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
