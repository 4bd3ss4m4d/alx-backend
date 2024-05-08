#!/usr/bin/python3
'''
This module contains a class BasicCache that inherits from BaseCaching
and is a caching system'''
BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    '''
    This class is a caching system and inherits from BaseCaching
    '''

    def put(self, key, item):
        '''
        Method that puts a key/value pair in the cache
        Args:
            key: key for the cache
            item: value to be stored in the cache
        '''
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        '''
        Method that gets the value associated with the key
        Args:
            key: key to get the value from
        '''
        return self.cache_data.get(key)
