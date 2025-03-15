#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Bu script, Python'un SSL sertifikalarını güncellemek için kullanılır.
macOS'ta SSL sertifika doğrulama sorunlarını çözmek için kullanılabilir.
"""

import os
import ssl
import certifi

print("Mevcut sertifika yolu:", ssl.get_default_verify_paths())
print("Certifi sertifika yolu:", certifi.where())

# SSL sertifika doğrulamasını devre dışı bırak
ssl._create_default_https_context = ssl._create_unverified_context
print("SSL sertifika doğrulaması devre dışı bırakıldı.") 