#!/usr/bin/python3
'''
This module contains a class FIFOCache that inherits from BaseCaching
and is a caching system
'''
BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    '''
    This class is a caching system and inherits from BaseCaching
    '''

    def __init__(self):
        '''
        Constructor
        '''
        super().__init__()

    def put(self, ke, item):
        '''
        Method that puts a key/value pair in the cache
        
        Args:
            key: key for the cache
            item: value to be stored in the cache
        '''
        if ke and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removes_item = next(iter(self.cache_data))
                self.cache_data.pop(removes_item)
                print("DISCARD: {}".format(removes_item))
            self.cache_data[ke] = item

    def get(self, key):
        '''
        Method that gets the value associated with the key
        
        Args:
            key: key to get the value from
        '''
        return self.cache_data.get(key)
