## This is your prebaked makefile!
## use the other one for actual running of code

greeting:
	echo 'hello'

math:
	expr 2 + 2

directories:
	-mkdir tmp
	-mkdir data

downloads:
	curl "https://www.imf.org/external/datamapper/api/v1/PCPIPCH?periods=2023" -o tmp/inflation.json
	curl "https://www.imf.org/external/datamapper/api/v1/countries" -o tmp/countries.json

