<?php
return array("#tableName"=>"product","#primaryKeys"=>["id"=>"id"],"#manyToOne"=>["section"],"#fieldNames"=>["id"=>"id","name"=>"name","comments"=>"comments","stock"=>"stock","image"=>"image","price"=>"price","promotion"=>"promotion","basketdetails"=>"basketdetails","orderdetails"=>"orderdetails","section"=>"idSection","associatedproducts"=>"associatedproducts","packs"=>"packs"],"#memberNames"=>["id"=>"id","name"=>"name","comments"=>"comments","stock"=>"stock","image"=>"image","price"=>"price","promotion"=>"promotion","basketdetails"=>"basketdetails","orderdetails"=>"orderdetails","idSection"=>"section","associatedproducts"=>"associatedproducts","packs"=>"packs"],"#fieldTypes"=>["id"=>"int(11)","name"=>"varchar(60)","comments"=>"text","stock"=>"int(11)","image"=>"text","price"=>"decimal(6,2)","promotion"=>"decimal(6,2)","basketdetails"=>"mixed","orderdetails"=>"mixed","section"=>"","associatedproducts"=>"mixed","packs"=>"mixed"],"#nullable"=>["id","comments","image"],"#notSerializable"=>["basketdetails","orderdetails","section","associatedproducts","packs"],"#transformers"=>[],"#accessors"=>["id"=>"setId","name"=>"setName","comments"=>"setComments","stock"=>"setStock","image"=>"setImage","price"=>"setPrice","promotion"=>"setPromotion","basketdetails"=>"setBasketdetails","orderdetails"=>"setOrderdetails","idSection"=>"setSection","associatedproducts"=>"setAssociatedproducts","packs"=>"setPacks"],"#oneToMany"=>["basketdetails"=>["mappedBy"=>"product","className"=>"models\\Basketdetail"],"orderdetails"=>["mappedBy"=>"product","className"=>"models\\Orderdetail"]],"#manyToMany"=>["associatedproducts"=>["targetEntity"=>"models\\Product","inversedBy"=>"associatedproducts"],"packs"=>["targetEntity"=>"models\\Product","inversedBy"=>"packs"]],"#joinTable"=>["associatedproducts"=>["name"=>"associatedproduct","inverseJoinColumns"=>["name"=>"idAssoProduct","referencedColumnName"=>"id"]],"packs"=>["name"=>"pack","joinColumns"=>["name"=>"idPack","referencedColumnName"=>"id"]]],"#joinColumn"=>["section"=>["className"=>"models\\Section","name"=>"idSection"]],"#invertedJoinColumn"=>["idSection"=>["member"=>"section","className"=>"models\\Section"]]);
