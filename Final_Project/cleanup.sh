#!/usr/bin/env bash

removeDirs() {
	for dir in ./data/*; do
		cd $dir &>/dev/null && rm -rf ./dataJSON 
	done
}
main() {
	removeDirs
}

main
