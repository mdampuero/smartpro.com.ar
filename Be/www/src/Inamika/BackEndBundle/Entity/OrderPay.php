<?php

namespace Inamika\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * OrderPay
 *
 * @ORM\Table(name="orders_pay")
 * @ORM\Entity(repositoryClass="Inamika\BackEndBundle\Repository\OrderPayRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class OrderPay
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
     * @var string
     *
     * @ORM\ManyToOne(targetEntity="Order", inversedBy="items",cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="order_id", referencedColumnName="id")
     */
    private $order;

    /**
     * @var string
     *
     * @ORM\Column(name="collection_id", type="string", length=255, nullable=true)
     */
    private $collectionId;

    /**
     * @var string
     *
     * @ORM\Column(name="collection_status", type="string", length=255, nullable=true)
     */
    private $collectionStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="external_reference", type="string", length=255, nullable=true)
     */
    private $externalReference;

    /**
     * @var string
     *
     * @ORM\Column(name="merchant_account_id", type="string", length=255, nullable=true)
     */
    private $merchantAccountId;
    
    /**
     * @var string
     *
     * @ORM\Column(name="merchant_order_id", type="string", length=255, nullable=true)
     */
    private $merchantOrderId;

    /**
     * @var string
     *
     * @ORM\Column(name="payment_id", type="string", length=255, nullable=true)
     */
    private $paymentId;
    
    /**
     * @var string
     *
     * @ORM\Column(name="payment_type", type="string", length=255, nullable=true)
     */
    private $paymentType;

    /**
     * @var string
     *
     * @ORM\Column(name="preference_id", type="string", length=255, nullable=true)
     */
    private $preferenceId;
    
    /**
     * @var string
     *
     * @ORM\Column(name="processing_mode", type="string", length=255, nullable=true)
     */
    private $processingMode;

    /**
     * @var string
     *
     * @ORM\Column(name="site_id", type="string", length=255, nullable=true)
     */
    private $siteId;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=255, nullable=true)
     */
    private $status;

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
     */
    private $updatedAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_delete", type="boolean")
     */
    private $isDelete=false;

    public function __construct($pay)
    {
        $this->collectionId=$pay["collection_id"];
        $this->collectionStatus=$pay["collection_status"];
        $this->externalReference=$pay["external_reference"];
        $this->merchantAccountId=$pay["merchant_account_id"];
        $this->merchantOrderId=$pay["merchant_order_id"];
        $this->paymentId=$pay["payment_id"];
        $this->paymentType=$pay["payment_type"];
        $this->preferenceId=$pay["preference_id"];
        $this->processingMode=$pay["processing_mode"];
        $this->siteId=$pay["site_id"];
        $this->status=$pay["status"];
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
     * Set order.
     *
     * @param string $order
     *
     * @return OrderPay
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get order.
     *
     * @return string
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Set collectionId.
     *
     * @param string $collectionId
     *
     * @return OrderPay
     */
    public function setCollectionId($collectionId)
    {
        $this->collectionId = $collectionId;

        return $this;
    }

    /**
     * Get collectionId.
     *
     * @return string
     */
    public function getCollectionId()
    {
        return $this->collectionId;
    }
    
    /**
     * Set collectionStatus.
     *
     * @param string $collectionStatus
     *
     * @return OrderPay
     */
    public function setCollectionStatus($collectionStatus)
    {
        $this->collectionStatus = $collectionStatus;

        return $this;
    }

    /**
     * Get collectionStatus.
     *
     * @return string
     */
    public function getCollectionStatus()
    {
        return $this->collectionStatus;
    }
   
    /**
     * Set externalReference.
     *
     * @param string $externalReference
     *
     * @return OrderPay
     */
    public function setExternalReference($externalReference)
    {
        $this->externalReference = $externalReference;

        return $this;
    }

    /**
     * Get externalReference.
     *
     * @return string
     */
    public function getExternalReference()
    {
        return $this->externalReference;
    }
    
    /**
     * Set merchantAccountId.
     *
     * @param string $merchantAccountId
     *
     * @return OrderPay
     */
    public function setMerchantAccountId($merchantAccountId)
    {
        $this->merchantAccountId = $merchantAccountId;

        return $this;
    }

    /**
     * Get merchantAccountId.
     *
     * @return string
     */
    public function getMerchantAccountId()
    {
        return $this->merchantAccountId;
    }
    
    /**
     * Set paymentId.
     *
     * @param string $paymentId
     *
     * @return OrderPay
     */
    public function setPaymentId($paymentId)
    {
        $this->paymentId = $paymentId;

        return $this;
    }

    /**
     * Get paymentId.
     *
     * @return string
     */
    public function getPaymentId()
    {
        return $this->paymentId;
    }
   
    /**
     * Set paymentType.
     *
     * @param string $paymentType
     *
     * @return OrderPay
     */
    public function setPaymentType($paymentType)
    {
        $this->paymentType = $paymentType;

        return $this;
    }

    /**
     * Get paymentType.
     *
     * @return string
     */
    public function getPaymentType()
    {
        return $this->paymentType;
    }

    /**
     * Set preferenceId.
     *
     * @param string $preferenceId
     *
     * @return OrderPay
     */
    public function setPreferenceId($preferenceId)
    {
        $this->preferenceId = $preferenceId;

        return $this;
    }

    /**
     * Get preferenceId.
     *
     * @return string
     */
    public function getPreferenceId()
    {
        return $this->preferenceId;
    }
   
    /**
     * Set processingMode.
     *
     * @param string $processingMode
     *
     * @return OrderPay
     */
    public function setProcessingMode($processingMode)
    {
        $this->processingMode = $processingMode;

        return $this;
    }

    /**
     * Get processingMode.
     *
     * @return string
     */
    public function getProcessingMode()
    {
        return $this->processingMode;
    }
    
    /**
     * Set siteId.
     *
     * @param string $siteId
     *
     * @return OrderPay
     */
    public function setSiteId($siteId)
    {
        $this->siteId = $siteId;

        return $this;
    }

    /**
     * Get siteId.
     *
     * @return string
     */
    public function getSiteId()
    {
        return $this->siteId;
    }
    
    /**
     * Set status.
     *
     * @param string $status
     *
     * @return OrderPay
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return OrderPay
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
     * @return OrderPay
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
     * Set isDelete.
     *
     * @param bool $isDelete
     *
     * @return OrderPay
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
