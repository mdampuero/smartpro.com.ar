<?php

namespace Inamika\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Product
 *
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\ProductRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(fields={"sku"}, repositoryMethod="getUniqueNotDeleted")
 * @ExclusionPolicy("all")
 */
class Product
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @Expose
     */
    private $id;

    /**
     * Many Users have Many Groups.
     * @ORM\ManyToMany(targetEntity="Category", cascade={"persist"})
     * @ORM\JoinTable(name="product_category",
     *      joinColumns={@ORM\JoinColumn(name="product_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="id")}
     *     )
     * @Expose
     */
    private $categories;
    
    /**
     * Many Products have one Provider. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Provider")
     * @ORM\JoinColumn(name="provider_id", referencedColumnName="id")
     * @Expose
     */
    private $provider;

    /**
     * Many Products have one UserLastEdit. This is the owning side.
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_last_edit_id", referencedColumnName="id")
     * @Expose
     */
    private $userLastEdit;

    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", length=64,nullable=true)
     * @Expose
     */
    private $category;

    /**
     * One product has many features. This is the inverse side.
     * @ORM\OneToMany(targetEntity="ProductPicture", mappedBy="product")
     * @Expose
     */
    private $pictures;

    /**
     * @var string
     *
     * @ORM\Column(name="ean", type="string", length=32,nullable=true)
     * @Expose
     */
    private $ean;

    /**
     * @var string
     *
     * @ORM\Column(name="sku", type="string", length=32)
     * @Assert\NotBlank()
     * @Expose
     */
    private $sku;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Assert\NotBlank()
     * @Expose
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="presentation", type="string", length=255,nullable=true)
     * @Expose
     */
    private $presentation;
        
    /**
     * @var string
     *
     * @ORM\Column(name="brand", type="string", length=255,nullable=true)
     * @Expose
     */
    private $brand;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float",nullable=true)
     * @Assert\NotBlank()
     * @Expose
     */
    private $price=0;

     /**
     * @var integer
     *
     * @ORM\Column(name="stock", type="float",nullable=true,options={"default" : 0})
     * @Expose
     */
    private $stock=0;

    /**
     * @var float
     *
     * @ORM\Column(name="cost", type="float",nullable=true)
     * @Expose
     */
    private $cost=0;

    /**
     * @var float
     *
     * @ORM\Column(name="price_min", type="float")
     * @Expose
     */
    private $priceMin=0;

    /**
     * @var float
     *
     * @ORM\Column(name="price_max", type="float")
     * @Expose
     */
    private $priceMax=0;
   
    /**
     * @var integer
     *
     * @ORM\Column(name="unit", type="integer")
     * @Expose
     */
    private $unit=1;
    
    /**
     * @var float
     *
     * @ORM\Column(name="vat", type="float")
     * @Expose
     */
    private $vat=1.21;
    
    /**
     * @var string
     *
     * @ORM\Column(name="picture", type="string", length=64,nullable=true)
     * @Expose
     */
    private $picture;

    /**
     * @var float
     *
     * @Expose
     */
    private $pictureXs;
    /**
     * @var float
     *
     * @Expose
     */
    private $pictureSm;
    /**
     * @var float
     *
     * @Expose
     */
    private $pictureMD;
    /**
     * @var float
     *
     * @Expose
     */
    private $pictureOr;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text",nullable=true)
     * @Expose
     */
    private $description;
    
    /**
     * @var string|null
     *
     * @ORM\Column(name="descriptionLarge", type="text",nullable=true)
     * @Expose
     */
    private $descriptionLarge;
    
    /**
     * @var string|null
     *
     * @ORM\Column(name="tags", type="text",nullable=true)
     * @Expose
     */
    private $tags;

    /**
     * @var boolean
     * @ORM\Column(name="is_salient", type="boolean")
     * @Expose
     */
    private $isSalient=false;
    
    /**
     * @var boolean
     * @ORM\Column(name="in_stock", type="boolean")
     * @Expose
     */
    private $inStock=true;
    
    /**
     * @var boolean
     * @ORM\Column(name="is_update", type="boolean")
     * @Expose
     */
    private $isUpdate=false;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     * @Expose
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_delete", type="boolean")
     */
    private $isDelete=false;

    public function __construct() {
        $this->pictures = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set categories.
     *
     * @param string $categories
     *
     * @return Productor
     */
    public function setCategories($categories)
    {
        $this->categories[] = $categories;

        return $this;
    }

    /**
     * Get categories.
     *
     * @return string
     */
    public function getCategories()
    {
        return $this->categories;
    }
    
    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get currency.
     *
     * @return string
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * Get pictures.
     *
     * @return array
     */
    public function getPictures()
    {
        return $this->pictures;
    }

    /**
     * Set ean.
     *
     * @param string|null $ean
     *
     * @return Product
     */
    public function setEan($ean = null)
    {
        $this->ean = $ean;

        return $this;
    }

    /**
     * Get ean.
     *
     * @return string|null
     */
    public function getEan()
    {
        return $this->ean;
    }

    /**
     * Set sku.
     *
     * @param string|null $sku
     *
     * @return Product
     */
    public function setSku($sku = null)
    {
        $this->sku = $sku;

        return $this;
    }

    /**
     * Get sku.
     *
     * @return string|null
     */
    public function getSku()
    {
        return $this->sku;
    }
   
    
    /**
     * Set presentation.
     *
     * @param string|null $presentation
     *
     * @return Product
     */
    public function setPresentation($presentation = null)
    {
        $this->presentation = $presentation;

        return $this;
    }

    /**
     * Get presentation.
     *
     * @return string|null
     */
    public function getPresentation()
    {
        return $this->presentation;
    }
    
    
    /**
     * Set brand.
     *
     * @param string|null $brand
     *
     * @return Product
     */
    public function setBrand($brand = null)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * Get brand.
     *
     * @return string|null
     */
    public function getBrand()
    {
        return $this->brand;
    }
    
    /**
     * Set category.
     *
     * @param string|null $category
     *
     * @return Product
     */
    public function setCategory($category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category.
     *
     * @return string|null
     */
    public function getCategory()
    {
        return $this->category;
    }
    
    /**
     * Set provider.
     *
     * @param string|null $provider
     *
     * @return Product
     */
    public function setProvider($provider = null)
    {
        $this->provider = $provider;

        return $this;
    }

    /**
     * Get provider.
     *
     * @return string|null
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * Set userLastEdit.
     *
     * @param string|null $userLastEdit
     *
     * @return Product
     */
    public function setUserLastEdit($userLastEdit = null)
    {
        $this->userLastEdit = $userLastEdit;

        return $this;
    }

    /**
     * Get userLastEdit.
     *
     * @return string|null
     */
    public function getUserLastEdit()
    {
        return $this->userLastEdit;
    }
    
    /**
     * Set picture.
     *
     * @param string|null $picture
     *
     * @return Product
     */
    public function setPicture($picture = null)
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * Get picture.
     *
     * @return string|null
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Product
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
    
    /**
     * Set descriptionLarge.
     *
     * @param string $descriptionLarge
     *
     * @return Product
     */
    public function setDescriptionLarge($descriptionLarge)
    {
        $this->descriptionLarge = $descriptionLarge;

        return $this;
    }

    /**
     * Get descriptionLarge.
     *
     * @return string
     */
    public function getDescriptionLarge()
    {
        return $this->descriptionLarge;
    }
    
    /**
     * Set tags.
     *
     * @param string $tags
     *
     * @return Product
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags.
     *
     * @return string
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set price.
     *
     * @param float|null $price
     *
     * @return Product
     */
    public function setPrice($price = null)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return float|null
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set stock.
     *
     * @param float|null $stock
     *
     * @return Product
     */
    public function setStock($stock = null)
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * Get stock.
     *
     * @return float|null
     */
    public function getStock()
    {
        return $this->stock;
    }
    
    /**
     * Set cost.
     *
     * @param float|null $cost
     *
     * @return Product
     */
    public function setCost($cost = null)
    {
        $this->cost = $cost;

        return $this;
    }

    /**
     * Get cost.
     *
     * @return float|null
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * Set priceMin.
     *
     * @param float|null $priceMin
     *
     * @return Product
     */
    public function setPriceMin($priceMin = null)
    {
        $this->priceMin = $priceMin;

        return $this;
    }

    /**
     * Get priceMin.
     *
     * @return float|null
     */
    public function getPriceMin()
    {
        return $this->priceMin;
    }
    
    /**
     * Set priceMax.
     *
     * @param float|null $priceMax
     *
     * @return Product
     */
    public function setPriceMax($priceMax = null)
    {
        $this->priceMax = $priceMax;

        return $this;
    }

    /**
     * Get priceMax.
     *
     * @return float|null
     */
    public function getPriceMax()
    {
        return $this->priceMax;
    }
    
    /**
     * Set unit.
     *
     * @param float|null $unit
     *
     * @return Product
     */
    public function setUnit($unit = null)
    {
        $this->unit = $unit;

        return $this;
    }

    /**
     * Get unit.
     *
     * @return float|null
     */
    public function getUnit()
    {
        return $this->unit;
    }
    
    /**
     * Set vat.
     *
     * @param float|null $vat
     *
     * @return Product
     */
    public function setVat($vat = null)
    {
        $this->vat = $vat;

        return $this;
    }

    /**
     * Get vat.
     *
     * @return float|null
     */
    public function getVat()
    {
        return $this->vat;
    }
    
    /**
     * Set pictureXs.
     *
     * @param float|null $pictureXs
     *
     * @return Product
     */
    public function setPictureXs($pictureXs = null)
    {
        $this->pictureXs = $pictureXs;

        return $this;
    }

    /**
     * Get pictureXs.
     *
     * @return float|null
     */
    public function getPictureXs()
    {
        return $this->pictureXs;
    }
    
    /**
     * Set pictureSm.
     *
     * @param float|null $pictureSm
     *
     * @return Product
     */
    public function setPictureSm($pictureSm = null)
    {
        $this->pictureSm = $pictureSm;

        return $this;
    }

    /**
     * Get pictureSm.
     *
     * @return float|null
     */
    public function getPictureSm()
    {
        return $this->pictureSm;
    }
    
    /**
     * Set pictureMD.
     *
     * @param float|null $pictureMD
     *
     * @return Product
     */
    public function setPictureMd($pictureMD = null)
    {
        $this->pictureMD = $pictureMD;

        return $this;
    }

    /**
     * Get pictureMD.
     *
     * @return float|null
     */
    public function getPictureMd()
    {
        return $this->pictureMD;
    }
    
    /**
     * Set pictureOr.
     *
     * @param float|null $pictureOr
     *
     * @return Product
     */
    public function setPictureOr($pictureOr = null)
    {
        $this->pictureOr = $pictureOr;

        return $this;
    }

    /**
     * Get pictureOr.
     *
     * @return float|null
     */
    public function getPictureOr()
    {
        return $this->pictureOr;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Product
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return Product
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    

    /**
     * Set isSalient.
     *
     * @param bool $isSalient
     *
     * @return Product
     */
    public function setIsSalient($isSalient)
    {
        $this->isSalient = $isSalient;

        return $this;
    }

    /**
     * Get isSalient.
     *
     * @return bool
     */
    public function getIsSalient()
    {
        return $this->isSalient;
    }
    
    /**
     * Set inStock.
     *
     * @param bool $inStock
     *
     * @return Product
     */
    public function setInStock($inStock)
    {
        $this->inStock = $inStock;

        return $this;
    }

    /**
     * Get inStock.
     *
     * @return bool
     */
    public function getInStock()
    {
        return $this->inStock;
    }
    
    /**
     * Set isDelete.
     *
     * @param bool $isDelete
     *
     * @return Product
     */
    public function setIsDelete($isDelete)
    {
        $this->isDelete = $isDelete;

        return $this;
    }

    /**
     * Get isDelete.
     *
     * @return bool
     */
    public function getIsDelete()
    {
        return $this->isDelete;
    }
    
    /**
     * Set isUpdate.
     *
     * @param bool $isUpdate
     *
     * @return Product
     */
    public function setIsUpdate($isUpdate)
    {
        $this->isUpdate = $isUpdate;

        return $this;
    }

    /**
     * Get isUpdate.
     *
     * @return bool
     */
    public function getIsUpdate()
    {
        return $this->isUpdate;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
    {
        $this->createdAt=new \DateTime();
    }
    
    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function setUpdatedAtValue()
    {
        $this->updatedAt=new \DateTime();
    }
}
