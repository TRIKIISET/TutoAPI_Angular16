import { Component, OnInit } from '@angular/core';
import { Category } from '../../enum/category';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
  lescategories = Object.values(Category);
    /*productForm = new FormGroup({
    id: new FormControl(1, {nonNullable:true}),
    libelle: new FormControl('', {nonNullable:true}),
    prix: new FormControl(0, {nonNullable:true}),
    madeIn:new FormControl('Tunisie', {nonNullable:true}),
    categorie: new FormControl(Category.Accessoires, {nonNullable:true}),
    nouveau:new FormControl(false, {nonNullable:true})
  }) 
*/

lesProduits!: Product[];
  productForm!: FormGroup;
  constructor(private fb:FormBuilder,
    private productService:ProductService){  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => this.lesProduits = data
    )

    this.productForm = this.fb.nonNullable.group({
      id: [ 0,Validators.required],
      libelle: ['', [Validators.required, Validators.pattern('[A-Z][a-zA-Z]+$')]],
      prix: [0, [Validators.required,Validators.min(0.1)]],
      madeIn:['Tunisie'],
      categorie: [Category.Accessoires],
      nouveau:[true],
      pointsVente:this.fb.array([])
    })
    this.productForm.get('nouveau')?.setValue(false);
    this.productForm.get('libelle')?.valueChanges
   // .pipe(debounceTime(400))
    .subscribe(
      data => console.log(data)
    )
  

  }
  
  onSubmitForm(){
    console.log(this.productForm.value);
    console.log(this.productForm.get("id")?.value);
    console.log(this.productForm.controls['libelle'].value);
    console.log(this.productForm.value["madeIn"]);

    /* Supposons que les pointsVente étaient facultatifs */
  /*  const formData = { ...this.productForm.value };
    if(this.lesPointsVente.controls.length==0)
     delete formData.pointsVente;
    this.productService.addProduct(formData).subscribe
    ( data => this.lesProduits.push(data))*/
    
     this.productService.addProduct(this.productForm.value).subscribe
    ( data => this.lesProduits.push(data))
  }

  onResetForm(){
    this.productForm.reset({categorie:Category.Fourniture, madeIn:'Autre'});
    this.lesPointsVente.clear();
  }
  public get idProduct(){
    return this.productForm.get('id');
  }
  public get libProduct(){
    return this.productForm.get('libelle');
  }
  public get priceProduct(){
    return this.productForm.get('prix');
  }
  public get lesPointsVente(){
    return this.productForm.get('pointsVente') as FormArray;
  }

  onAjouter(){
    this.lesPointsVente.push(this.fb.control('',[Validators.required,Validators.minLength(2)]))
    // Autre possibilité 
   // this.lesPointsVente.push(new FormControl(''))
  }

  isValidPattern(){
    return this.libProduct?.errors?.['pattern'] && this.libProduct?.dirty; 
  }

  isRequiredLibelle(){
    return this.libProduct?.errors?.['required'] && this.libProduct?.dirty; 
  }
}
