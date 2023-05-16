package utils

import (
	"crypto/rand"
	"encoding/hex"
)

func NewID() string {
	return SecureGenerateHex(22)
}

func SecureGenerateHex(length int) string {
	byteLength := (length + 1) / 2
	b := make([]byte, byteLength)
	_, err := rand.Read(b[:])
	if err != nil {
		panic(err)
	}
	return hex.EncodeToString(b[:])
}
