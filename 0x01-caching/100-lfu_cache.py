#!/usr/bin/python3
'''
This module contains a class LFUCache that inherits from BaseCaching
'''
BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    '''
    This class is a caching system and inherits from BaseCaching
    '''

    def __init__(self):
        '''
        Constructor
        '''
        super().__init__()
        self.freq = {}

    def put(self, ke, item):
        '''
        This method puts a key/value pair in the cache
        
        Args:
            key: key for the cache
            item: value to be stored in the cache
        '''
        if ke is None or item is None:
            return

        if ke in self.cache_data:
            self.cache_data[ke] = item
            self.freq[ke] += 1
        else:
            if len(self.cache_data) >= self.MAX_ITEMS:
                minimum_frequen = min(self.freq.values())
                least_freq_keys = [
                    k for k, v in self.freq.items() if v == minimum_frequen
                ]
                key_lfu = min(least_freq_keys, key=self.freq.get)
                self.cache_data.pop(key_lfu)
                self.freq.pop(key_lfu)
                print("DISCARD:", key_lfu)

            self.cache_data[ke] = item
            self.freq[ke] = 1

    def get(self, ke):
        '''
        This method gets the value associated with the key
        
        Args:
            key: key to get the value from
        '''
        if ke in self.cache_data:
            self.freq[ke] += 1
            return self.cache_data.get(ke)
