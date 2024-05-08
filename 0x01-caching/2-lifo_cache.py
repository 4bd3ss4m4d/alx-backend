#!/usr/bin/python3
'''
This module contains a class LIFOCache that inherits from BaseCaching
'''
BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
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
        This method puts a key/value pair in the cache
        
        Args:
            key: key for the cache
            item: value to be stored in the cache
        '''
        if ke and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                item_removed = list(self.cache_data.keys())[-1]
                self.cache_data.pop(item_removed)
                print("DISCARD: {}".format(item_removed))
            self.cache_data[ke] = item

    def get(self, key):
        '''
        This method gets the value associated with the key
        
        Args:
            key: key to get the value from
        '''
        return self.cache_data.get(key)
