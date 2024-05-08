#!/usr/bin/python3
'''
This module contains a class MRUCache that inherits from BaseCaching
'''
BaseCaching = __import__("base_caching").BaseCaching


class MRUCache(BaseCaching):
    '''
    This class is a caching system and inherits from BaseCaching
    '''

    def __init__(self):
        '''
        Constructor
        '''
        super().__init__()
        self.order = []

    def put(self, ke, item):
        '''
        This method puts a key/value pair in the cache
        
        Args:
            key: key for the cache
            item: value to be stored in the cache
        '''
        if ke and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed_item = self.order.pop()
                self.cache_data.pop(removed_item)
                print("DISCARD: {}".format(removed_item))
            self.cache_data[ke] = item
            self.order.append(ke)

    def get(self, ke):
        '''
        This method gets the value associated with the key
        
        Args:
            key: key to get the value from
        '''
        if ke in self.cache_data:
            self.order.remove(ke)
            self.order.append(ke)
            return self.cache_data.get(ke)
